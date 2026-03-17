/**
 * Physics-based 2D fluid simulation (Stable Fluids / Navier-Stokes).
 * Velocity field only; used to displace a background image.
 * Based on concepts from PavelDoGreat/WebGL-Fluid-Simulation (MIT).
 */

const SIM_RES = 256
const PRESSURE_ITERATIONS = 20
const VELOCITY_DISSIPATION = 1.5
const CURL = 28
const SPLAT_RADIUS = 0.25
const SPLAT_FORCE = 35
const DISPLACEMENT_SCALE = 0.045

const baseVertex = `#version 300 es
layout(location=0) in vec2 aPosition;
out vec2 vUv;
out vec2 vL,vR,vT,vB;
uniform vec2 texelSize;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const advectionFrag = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
out vec4 fragColor;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  vec4 result = texture(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  fragColor = result / decay;
}`

const divergenceFrag = `#version 300 es
precision mediump float;
in vec2 vUv,vL,vR,vT,vB;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  float div = 0.5 * (R - L + T - B);
  fragColor = vec4(div, 0.0, 0.0, 1.0);
}`

const curlFrag = `#version 300 es
precision mediump float;
in vec2 vUv,vL,vR,vT,vB;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  fragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`

const vorticityFrag = `#version 300 es
precision highp float;
in vec2 vUv,vL,vR,vT,vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
out vec4 fragColor;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 1e-5;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity += force * dt;
  velocity = clamp(velocity, -1e4, 1e4);
  fragColor = vec4(velocity, 0.0, 1.0);
}`

const pressureFrag = `#version 300 es
precision mediump float;
in vec2 vUv,vL,vR,vT,vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
out vec4 fragColor;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`

const gradientSubtractFrag = `#version 300 es
precision mediump float;
in vec2 vUv,vL,vR,vT,vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`

const splatFrag = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
out vec4 fragColor;
void main() {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`

const clearFrag = `#version 300 es
precision mediump float;
in vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
out vec4 fragColor;
void main() {
  fragColor = value * texture(uTexture, vUv);
}`

const displayDisplacementFrag = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uBackground;
uniform sampler2D uVelocity;
uniform float displacementScale;
out vec4 fragColor;
void main() {
  vec2 vel = texture(uVelocity, vUv).xy;
  vec2 uv = vUv + displacementScale * vel;
  uv.y = 1.0 - uv.y;
  fragColor = texture(uBackground, uv);
}`

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    throw new Error('Shader compile failed')
  }
  return shader
}

function createProgram(gl: WebGL2RenderingContext, vsSource: string, fsSource: string): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource)
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    throw new Error('Program link failed')
  }
  return program
}

function createFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
) {
  const texture = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)
  const fbo = gl.createFramebuffer()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX: 1 / w,
    texelSizeY: 1 / h,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      return id
    },
  }
}

function createDoubleFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
) {
  let read = createFBO(gl, w, h, internalFormat, format, type, param)
  let write = createFBO(gl, w, h, internalFormat, format, type, param)
  return {
    width: w,
    height: h,
    texelSizeX: read.texelSizeX,
    texelSizeY: read.texelSizeY,
    get read() {
      return read
    },
    set read(v) {
      read = v
    },
    get write() {
      return write
    },
    set write(v) {
      write = v
    },
    swap() {
      const t = read
      read = write
      write = t
    },
  }
}

const QUAD = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1])
const INDICES = new Uint16Array([0, 1, 2, 0, 2, 3])

export interface SplatPointer {
  x: number
  y: number
  dx: number
  dy: number
}

export class FluidSim {
  private gl: WebGL2RenderingContext
  private velocity: ReturnType<typeof createDoubleFBO>
  private divergence: ReturnType<typeof createFBO>
  private curl: ReturnType<typeof createFBO>
  private pressure: ReturnType<typeof createDoubleFBO>
  private programs: Record<string, WebGLProgram>
  private uniforms: Record<string, Record<string, WebGLUniformLocation | null>>
  private quadBuffer: WebGLBuffer
  private indexBuffer: WebGLBuffer
  private width: number
  private height: number
  private aspectRatio: number
  private pendingSplats: SplatPointer[] = []

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    })
    if (!gl) throw new Error('WebGL2 not supported')
    this.gl = gl
    gl.getExtension('EXT_color_buffer_float')

    this.width = SIM_RES
    this.height = Math.round(SIM_RES / (canvas.width / canvas.height)) || SIM_RES
    this.aspectRatio = canvas.width / canvas.height

    const rg = { internalFormat: gl.RG16F, format: gl.RG }
    const r = { internalFormat: gl.R16F, format: gl.RED }
    const filtering = gl.LINEAR

    this.velocity = createDoubleFBO(
      gl,
      this.width,
      this.height,
      rg.internalFormat,
      rg.format,
      gl.HALF_FLOAT,
      filtering
    )
    this.divergence = createFBO(
      gl,
      this.width,
      this.height,
      r.internalFormat,
      r.format,
      gl.HALF_FLOAT,
      gl.NEAREST
    )
    this.curl = createFBO(
      gl,
      this.width,
      this.height,
      r.internalFormat,
      r.format,
      gl.HALF_FLOAT,
      gl.NEAREST
    )
    this.pressure = createDoubleFBO(
      gl,
      this.width,
      this.height,
      r.internalFormat,
      r.format,
      gl.HALF_FLOAT,
      gl.NEAREST
    )

    const getUniforms = (p: WebGLProgram) => {
      const u: Record<string, WebGLUniformLocation | null> = {}
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(p, i)!
        u[info.name] = gl.getUniformLocation(p, info.name)
      }
      return u
    }

    this.programs = {
      advection: createProgram(gl, baseVertex, advectionFrag),
      divergence: createProgram(gl, baseVertex, divergenceFrag),
      curl: createProgram(gl, baseVertex, curlFrag),
      vorticity: createProgram(gl, baseVertex, vorticityFrag),
      pressure: createProgram(gl, baseVertex, pressureFrag),
      gradientSubtract: createProgram(gl, baseVertex, gradientSubtractFrag),
      splat: createProgram(gl, baseVertex, splatFrag),
      clear: createProgram(gl, baseVertex, clearFrag),
      display: createProgram(gl, baseVertex, displayDisplacementFrag),
    }
    this.uniforms = {}
    for (const [name, prog] of Object.entries(this.programs)) {
      this.uniforms[name] = getUniforms(prog)
    }

    this.quadBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW)
    this.indexBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, INDICES, gl.STATIC_DRAW)
  }

  private blit(target: { fbo: WebGLFramebuffer; width: number; height: number } | null, clear = false) {
    const gl = this.gl
    if (target) {
      gl.viewport(0, 0, target.width, target.height)
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
    if (clear) {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
  }

  private setProgram(name: string) {
    this.gl.useProgram(this.programs[name])
  }

  private u(name: string, key: string) {
    return this.uniforms[name][key]
  }

  splat(x: number, y: number, dx: number, dy: number) {
    this.pendingSplats.push({ x, y, dx, dy })
  }

  step(dt: number) {
    const gl = this.gl
    const v = this.velocity
    const d = this.divergence
    const c = this.curl
    const p = this.pressure
    const texel = (prog: string) =>
      gl.uniform2f(this.u(prog, 'texelSize')!, v.texelSizeX, v.texelSizeY)

    gl.disable(gl.BLEND)

    while (this.pendingSplats.length > 0) {
      const s = this.pendingSplats.shift()!
      const radius = this.aspectRatio > 1 ? SPLAT_RADIUS * this.aspectRatio : SPLAT_RADIUS
      this.setProgram('splat')
      gl.uniform1f(this.u('splat', 'aspectRatio')!, this.width / this.height)
      gl.uniform2f(this.u('splat', 'point')!, s.x, s.y)
      gl.uniform3f(this.u('splat', 'color')!, s.dx * SPLAT_FORCE, s.dy * SPLAT_FORCE, 0)
      gl.uniform1f(this.u('splat', 'radius')!, radius * radius)
      v.read.attach(0)
      gl.uniform1i(this.u('splat', 'uTarget')!, 0)
      this.blit(v.write)
      v.swap()
    }

    this.setProgram('curl')
    texel('curl')
    v.read.attach(0)
    gl.uniform1i(this.u('curl', 'uVelocity')!, 0)
    this.blit(c)

    this.setProgram('vorticity')
    texel('vorticity')
    v.read.attach(0)
    c.attach(1)
    gl.uniform1i(this.u('vorticity', 'uVelocity')!, 0)
    gl.uniform1i(this.u('vorticity', 'uCurl')!, 1)
    gl.uniform1f(this.u('vorticity', 'curl')!, CURL)
    gl.uniform1f(this.u('vorticity', 'dt')!, dt)
    this.blit(v.write)
    v.swap()

    this.setProgram('divergence')
    texel('divergence')
    v.read.attach(0)
    gl.uniform1i(this.u('divergence', 'uVelocity')!, 0)
    this.blit(d)

    this.setProgram('clear')
    p.read.attach(0)
    gl.uniform1i(this.u('clear', 'uTexture')!, 0)
    gl.uniform1f(this.u('clear', 'value')!, 0.8)
    this.blit(p.write)
    p.swap()

    this.setProgram('pressure')
    texel('pressure')
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
      d.attach(0)
      p.read.attach(1)
      gl.uniform1i(this.u('pressure', 'uDivergence')!, 0)
      gl.uniform1i(this.u('pressure', 'uPressure')!, 1)
      this.blit(p.write)
      p.swap()
    }

    this.setProgram('gradientSubtract')
    texel('gradientSubtract')
    p.read.attach(0)
    v.read.attach(1)
    gl.uniform1i(this.u('gradientSubtract', 'uPressure')!, 0)
    gl.uniform1i(this.u('gradientSubtract', 'uVelocity')!, 1)
    this.blit(v.write)
    v.swap()

    this.setProgram('advection')
    texel('advection')
    v.read.attach(0)
    gl.uniform1i(this.u('advection', 'uVelocity')!, 0)
    gl.uniform1i(this.u('advection', 'uSource')!, 0)
    gl.uniform1f(this.u('advection', 'dt')!, dt)
    gl.uniform1f(this.u('advection', 'dissipation')!, VELOCITY_DISSIPATION)
    this.blit(v.write)
    v.swap()
  }

  render(
    backgroundTexture: WebGLTexture,
    _viewportWidth: number,
    _viewportHeight: number,
    _imageWidth: number,
    _imageHeight: number
  ) {
    const gl = this.gl
    this.setProgram('display')
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, backgroundTexture)
    gl.uniform1i(this.u('display', 'uBackground')!, 0)
    this.velocity.read.attach(1)
    gl.uniform1i(this.u('display', 'uVelocity')!, 1)
    gl.uniform1f(this.u('display', 'displacementScale')!, DISPLACEMENT_SCALE)
    this.blit(null)
  }

  destroy() {
    const gl = this.gl
    gl.deleteBuffer(this.quadBuffer)
    gl.deleteBuffer(this.indexBuffer)
    for (const p of Object.values(this.programs)) gl.deleteProgram(p)
  }
}

import vertexShaderSource from './vertex-shader.vert'
import fragmentShaderSource from './fragment-shader.frag'

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const isSuccess = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if(isSuccess) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
  return null;
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram()

  if (!program)
    return null;

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
  return null;
}

function main() {
  // Get A WebGL context
  const canvas = document.createElement('canvas')

  const root = document.getElementById('root')

  if (root === null)
    return;

  root.appendChild(canvas)

  const gl  = canvas.getContext('webgl2')
  if (!gl) {
    return;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  if (vertexShader === null || fragmentShader === null){
    return;
  }

  const program = createProgram(gl, vertexShader, fragmentShader)

  if (program === null){
    return;
  }

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
  const positionBuffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
  ]

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(positionAttributeLocation)

  const size = 2
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.bindVertexArray(vao)

  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

main();

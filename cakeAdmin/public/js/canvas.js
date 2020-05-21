// using original library https://github.com/ko-yelie/kgl

const width = 100
const height = 100

const sizeUniform = [width, height]
const particleUv = []

for (let j = 0; j < height; j++) {
  for (let i = 0; i < width; i++) {
    particleUv.push(i / (width - 1), 1 - j / (height - 1))
  }
}

const webgl = new Kgl({
  cameraPosition: [0, 0, 480.],
  fov: 50,
  programs: {
    resetVelocity: {
      fragmentShaderId: 'reset-velocity',
      isFloats: true,
    },
    resetPosition: {
      fragmentShaderId: 'reset-position',
      uniforms: {
        size: sizeUniform,
      },
      isFloats: true,
    },
    velocity: {
      fragmentShaderId: 'velocity',
      uniforms: {
        size: sizeUniform,
        prevVelocityTexture: 'framebuffer',
        prevPositionTexture: 'framebuffer',
      },
      isFloats: true,
    },
    position: {
      fragmentShaderId: 'position',
      uniforms: {
        size: sizeUniform,
        prevPositionTexture: 'framebuffer',
        velocityTexture: 'framebuffer',
      },
      isFloats: true,
    },
    main: {
      vertexShaderId: 'main-vs',
      fragmentShaderId: 'main-fs',
      attributes: {
        position: {
          value: [1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1],
          size: 3,
        },
        normal: {
          value: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1],
          size: 3
        },
        indices: {
          value: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23],
          isIndices: true
        },
      },
      instancedAttributes: {
        instancedUv: {
          value: particleUv,
          size: 2
        }
      },
      uniforms: {
        positionTexture: 'framebuffer',
        velocityTexture: 'framebuffer',
        time: 0,
      },
      isDepth: true,
      isTransparent: true,
    },
    texture: {
      fragmentShaderId: 'texture',
      uniforms: {
        texture: 'framebuffer'
      },
      clearedColor: [0, 0, 0, 1],
      isTransparent: true
    }
  },
  framebuffers: [
    'scene',
  ],
  framebufferFloats: {
    velocity0: {
      width,
      height
    },
    velocity1: {
      width,
      height
    },
    position0: {
      width,
      height
    },
    position1: {
      width,
      height
    }
  },
  isAutoStart: false
})

let loopCount = 0
let targetbufferIndex
let prevbufferIndex
let i

targetbufferIndex = loopCount++ % 2

{
  webgl.bindFramebuffer('velocity' + targetbufferIndex)
  webgl.programs['resetVelocity'].draw()
}

{
  webgl.bindFramebuffer('position' + targetbufferIndex)
  webgl.programs['resetPosition'].draw()
}

const draw = time => {
  targetbufferIndex = loopCount++ % 2
  prevbufferIndex = 1 - targetbufferIndex

  {
    webgl.bindFramebuffer('velocity' + targetbufferIndex)

    webgl.programs['velocity'].draw({
      prevVelocityTexture: 'velocity' + prevbufferIndex,
      prevPositionTexture: 'position' + prevbufferIndex,
    })
  }

  {
    webgl.bindFramebuffer('position' + targetbufferIndex)

    webgl.programs['position'].draw({
      prevPositionTexture: 'position' + prevbufferIndex,
      velocityTexture: 'velocity' + targetbufferIndex,
    })
  }

  {
    webgl.bindFramebuffer('scene')

    webgl.programs['main'].draw({
      positionTexture: 'position' + targetbufferIndex,
      velocityTexture: 'velocity' + targetbufferIndex,
      time,
    })
  }

  {
    webgl.unbindFramebuffer()

    webgl.programs['texture'].draw({
      texture: 'scene',
    })
  }

  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
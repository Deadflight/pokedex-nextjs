import { useCallback } from 'react'
import NextImage from 'next/image'

const aspectRatioToRatio = {
  '1:1': 1,
  '16:9': 9 / 16,
  '4:3': 3 / 4,
  '3:2': 2 / 3,
  '9:12': 12 / 9,
}

const Image = ({
  width,
  fit = 'fill',
  aspectRatio,
  ...nextImageProps
}) => {
  const height = calcAspectRatio(aspectRatio, width)

  const imageLoader = useCallback(
    (loaderArgs) => {
      const h = calcAspectRatio(aspectRatio, loaderArgs.width)

      return `${loaderArgs.src}?w=${loaderArgs.width}&h=${h}&fit=${fit}`
    },
    [aspectRatio, fit]
  )

  return (
    <NextImage
      {...nextImageProps}
      width={width}
      height={height}
      loader={imageLoader}
    />
  )
}

function calcAspectRatio(aspectRatio, width) {
  const ratio = aspectRatioToRatio[aspectRatio]

  return Math.floor(width * ratio)
}

export default Image
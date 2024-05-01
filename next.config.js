/** @type {import('next').NextConfig} */

module.exports = (_phase, { defaultConfig }) => {
  return Object.assign(defaultConfig, {
    env: {
      LIZIFA: 'my-value',
    },
  })
}
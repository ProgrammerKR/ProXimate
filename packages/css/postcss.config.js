module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': false // Let browsers handle custom properties
      }
    },
    ...(ctx.env === 'production' ? { cssnano: {} } : {})
  }
});

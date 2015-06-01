module.exports = {
  build: {
    files: [
      // Copy just the index.html
      { src: '<%= appconfig.src %>/index.html', dest: '<%= appconfig.dest %>/index.html', filter: 'isFile' },
      // Copy un-minified production JS
      { src: '.tmp/concat/js/production.min.js', dest: '<%= appconfig.dest %>/js/production.min.js', filter: 'isFile' },
      // Copy audio files
      { expand: true, cwd: '<%= appconfig.src %>/audio/', src: ['**'], dest: '<%= appconfig.dest %>/audio/' }
    ]
  }
};

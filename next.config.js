/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.licdn.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  }
};

module.exports = nextConfig;

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff(2)?|ttf|otf|eot)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/fonts/',
            publicPath: '../src/assets/Fonts',
          },
        },
      ],
    });

    return config;
  },
};

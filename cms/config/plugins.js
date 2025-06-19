module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-supabase-v4',
      providerOptions: {
        apiUrl: env('SUPABASE_API_URL'),
        apiKey: env('SUPABASE_API_KEY'),
        bucket: env('SUPABASE_BUCKET'),
        directory: '', // optional
        options: {},
      },
    },
  },
});

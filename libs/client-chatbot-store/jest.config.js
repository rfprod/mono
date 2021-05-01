module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-chatbot-store',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  displayName: 'client-chatbot-store',
};

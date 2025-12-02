const WHITE_LABEL_CONFIG = {
  default1: {
    name: 'Default1',
    slug: 'default1',
    scheme: 'default1',
    icon: './assets/ic_launcher2.png',
    splash: {
       image: './assets/loading.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      bundleIdentifier: 'br.com.one.default1',
      supportsTablet: true,
    },
    android: {
      package: 'br.com.one.default1',
      googleServicesFile: 'google/default1/google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/images/default1/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    // extra: {
    //   eas: {
    //    projectId: ""
    //   },
    // },
  },
  default2: {
    name: 'Default2',
    slug: 'default2',
    scheme: 'default2',
    icon: './assets/jsl_auth_logo.png',
    splash: {
      image: './assets/jsl_splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      bundleIdentifier: 'br.com.default2',
      supportsTablet: true,
    },
    android: {
      package: 'br.com.default2',
      googleServicesFile: 'google/default2/google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/images/default2/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    // extra: {
    //   eas: {
    //    "projectId": ""
    //   },
    // },
  },
};

module.exports = () => {
  const project = process.env.EXPO_PUBLIC_BRAND || 'default1';
  const projectConfig = WHITE_LABEL_CONFIG[project];

  if (!projectConfig) {
    throw new Error(
      `Marca inválida: ${project}. Configure WHITE_LABEL_PROJECT corretamente.`
    );
  }

  return {
    expo: {
      ...projectConfig,
      version: '1.0.0',
      orientation: 'portrait',
      userInterfaceStyle: 'light',
      newArchEnabled: true,
      plugins: ['expo-router', 'expo-font'],
      updates: {
      fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ['**/*'],
      web: {
        favicon: './assets/favicon.png',
      },
      extra: {
        ...projectConfig.extra,
        WHITE_LABEL_PROJECT: project,
      },
    },
  };
};
export type SupportedPlatform = '微信小程序' | '支付宝小程序' | 'H5' | '其他平台'

function detectPlatform(): SupportedPlatform {
  // #ifdef MP-WEIXIN
  return '微信小程序'
  // #endif

  // #ifdef MP-ALIPAY
  return '支付宝小程序'
  // #endif

  // #ifdef H5
  return 'H5'
  // #endif

  return '其他平台'
}

export const currentPlatform = detectPlatform()

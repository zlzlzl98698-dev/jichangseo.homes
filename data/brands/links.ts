export interface BrandAffLink {
  id: string;
  name: string;
  slug: string;
  affiliateUrl: string;
  coupon?: string;
  couponDiscount?: string;
}

export const BRAND_LINKS: Record<string, BrandAffLink> = {
  guangsu: {
    id: "brand-01",
    name: "光速云",
    slug: "guangsu",
    affiliateUrl: "https://sahude.gsyvipaff.com/#/?code=keqgvT5Y",
    coupon: "AMM",
    couponDiscount: "新人优惠券"
  },
  muguang: {
    id: "brand-02",
    name: "暮光加速",
    slug: "muguang",
    affiliateUrl: "https://varnexa.twilightaff.com/#/?code=D1LHglg3",
    coupon: "muguang5555"
  },
  feimao: {
    id: "brand-03",
    name: "飞猫云",
    slug: "feimao",
    affiliateUrl: "https://guangs.flycataff.com/#/?code=6uq0Xe9y",
    coupon: "flycat888",
    couponDiscount: "8折"
  },
  weifeng: {
    id: "brand-04",
    name: "微风网络",
    slug: "weifeng",
    affiliateUrl: "https://edp01.breezenetaff.com/#/?code=t3huofyI",
    coupon: "flat888",
    couponDiscount: "9折"
  },
  dalaoyun: {
    id: "brand-05",
    name: "大佬云",
    slug: "dalaoyun",
    affiliateUrl: "https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN",
    coupon: "dly888"
  },
  xingdaomeng: {
    id: "brand-06",
    name: "星岛梦",
    slug: "xingdaomeng",
    affiliateUrl: "https://guangs.xingdaomeng.com/#/?code=1TynBYnR",
    coupon: "nmw888"
  },
  ermao: {
    id: "brand-07",
    name: "二猫云",
    slug: "ermao",
    affiliateUrl: "https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW",
    coupon: "ermao5555"
  },
  wuyou: {
    id: "brand-08",
    name: "无忧链接",
    slug: "wuyou",
    affiliateUrl: "https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL",
    coupon: "wuyou666"
  },
  weitu: {
    id: "brand-09",
    name: "唯兔云",
    slug: "weitu",
    affiliateUrl: "https://guangs.v2yunvipaff.com/#/?code=xIutqOBA",
    coupon: "weitu666"
  },
  firefly: {
    id: "brand-10",
    name: "Firefly",
    slug: "firefly",
    affiliateUrl: "https://vip02.fireflyaff.com/#/?code=2n7VURre",
    coupon: "firefly",
    couponDiscount: "8折"
  },
  yuzhou: {
    id: "brand-11",
    name: "宇宙云",
    slug: "yuzhou",
    affiliateUrl: "https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1",
    coupon: "YUZHOU553"
  },
  u1s1: {
    id: "brand-12",
    name: "U1S1",
    slug: "u1s1",
    affiliateUrl: "https://guangs.vipaff.cc/#/?code=xhX5X22f",
    coupon: "akaka"
  },
  lingmao: {
    id: "brand-13",
    name: "灵猫网络",
    slug: "lingmao",
    affiliateUrl: "https://vip01.civetnet.com/#/?code=8MIAyxak",
    coupon: "lmao888"
  },
  jilian: {
    id: "brand-14",
    name: "极连云",
    slug: "jilian",
    affiliateUrl: "https://guangs.jlyvipaff.com/#/?code=VM1rKGUu",
    coupon: "ji8888"
  },
  guangnian: {
    id: "brand-15",
    name: "光年梯",
    slug: "guangnian",
    affiliateUrl: "https://guangs.gntaff.com/#/?code=X1FoxjGE",
    coupon: "gnt6666"
  },
  yifan: {
    id: "brand-16",
    name: "一翻云",
    slug: "yifan",
    affiliateUrl: "https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r",
    coupon: "yfy6666"
  },
  sogo: {
    id: "brand-17",
    name: "SOGO 云",
    slug: "sogo",
    affiliateUrl: "https://guangs.sogoyunaff.cc/#/?code=327Vs0w7",
    coupon: "SOGO10000"
  },
  kexin: {
    id: "brand-18",
    name: "可信云",
    slug: "kexin",
    affiliateUrl: "https://guangs.kosingaff.com/#/register?code=UYDtNlCY",
    coupon: "kkk333"
  },
  sujie: {
    id: "brand-19",
    name: "速界",
    slug: "sujie",
    affiliateUrl: "https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB",
    coupon: "sss1111"
  },
  shanyue: {
    id: "brand-20",
    name: "闪跃",
    slug: "shanyue",
    affiliateUrl: "https://vip02.flashleapaff.com/#/?code=3lgzm9mm",
    coupon: "shanyue"
  },
  quanqiu: {
    id: "brand-21",
    name: "全球云",
    slug: "quanqiu",
    affiliateUrl: "https://guangs.gcvipaff.com/#/?code=Ov2nvU9C",
    coupon: "qq88"
  },
  shandianshu: {
    id: "brand-22",
    name: "闪电鼠",
    slug: "shandianshu",
    affiliateUrl: "https://qwerty.shandianshuaff.com/#/?code=rUE75iYh",
    coupon: "sd88"
  },
  yunjiexian: {
    id: "brand-23",
    name: "云界线",
    slug: "yunjiexian",
    affiliateUrl: "https://qwerty.yunjiexianaff.com/?code=aycnwNUi",
    coupon: "yjx888"
  },
  liulianyun: {
    id: "brand-24",
    name: "榴莲云",
    slug: "liulianyun",
    affiliateUrl: "https://qwerty.liulianyunaff.com#/?code=hS5pvbfE",
    coupon: "ll88"
  },
  shenxing: {
    id: "brand-25",
    name: "神行加速",
    slug: "shenxing",
    affiliateUrl: "https://qwerty.shenxingaff.com/#/?code=gawDQqVE",
    coupon: "xs0077"
  },
  huanqiuti: {
    id: "brand-26",
    name: "环球梯",
    slug: "huanqiuti",
    affiliateUrl: "https://qwerty.huanqiutiaff.com/?code=9I4KRNPH",
    coupon: "HQ66"
  },
  yinxingren: {
    id: "brand-27",
    name: "隐形人",
    slug: "yinxingren",
    affiliateUrl: "https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT",
    coupon: "yxr888"
  },
  tiziyun: {
    id: "brand-28",
    name: "梯子云",
    slug: "tiziyun",
    affiliateUrl: "https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0",
    coupon: "tiziyun"
  },
  lingdong: {
    id: "brand-29",
    name: "灵动云",
    slug: "lingdong",
    affiliateUrl: "https://varnexa.lingdongaff.com/#/?code=wZvEhEoI"
  },
  langwang: {
    id: "brand-30",
    name: "浪网",
    slug: "langwang",
    affiliateUrl: "https://varnexa.wavenetaff.com/#/?code=xwAM4tTd"
  },
  edgenova: {
    id: "brand-31",
    name: "边缘节点 EdgeNova",
    slug: "edgenova",
    affiliateUrl: "https://work.edgenovaaff.cc/#/register?code=cl3iB5YG",
    coupon: "TH888",
    couponDiscount: "8折"
  },
  kuaili: {
    id: "brand-32",
    name: "快狸",
    slug: "kuaili",
    affiliateUrl: "https://work.kuailicloud.cc",
    coupon: "kuaili888"
  }
};

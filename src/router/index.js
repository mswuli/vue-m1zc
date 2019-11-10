import Vue from 'vue'
import Router from 'vue-router'

//一级路由（导入文件）
import TabBar from '@/pages/TabBar'
import Download from '@/pages/Download'
import MallBrand from '@/pages/Mall/MallBrand'
import MallScreen from '@/pages/Mall/MallScreen'
import MallSearchs from '@/pages/Mall/MallSearchs'
import Detail from '@/pages/Detail/Detail'
import DetailConfMore from '@/pages/Detail/DetailConfMore'
import DetailParameterMore from '@/pages/Detail/DetailParameterMore'
import ArticlesDetail from '@/pages/Articles/ArticlesDetail'
import ArticlesBrand from '@/pages/Articles/ArticlesBrand'
import ArticlesSearchs from '@/pages/Articles/ArticlesSearchs'
import AccountLoginMsg from '@/pages/Account/AccountLoginMsg'
import AccountLogin from '@/pages/Account/AccountLogin'
import AccountReg from '@/pages/Account/AccountReg'
import AccountReset from '@/pages/Account/AccountReset'
import AccountProtocol from '@/pages/Account/AccountProtocol'
import qq_login from '@/pages/Account/qq_login'
import qq_binding from '@/pages/Account/qq_binding'
import wx_binding from '@/pages/Account/wx_binding'
import OrderAddr from '@/pages/Order/OrderAddr'
import OrderIns from '@/pages/Order/OrderIns'
import OrderUpd from '@/pages/Order/OrderUpd'
import OrderSum from '@/pages/Order/OrderSum'
import OrderXieyi from '@/pages/Order/OrderXieyi'
import PayOrder from '@/pages/Order/PayOrder'
import PayShortcut from '@/pages/Order/PayShortcut'
import PayError from '@/pages/Order/PayError'
import PaySuccess from '@/pages/Order/PaySuccess'
import PayObligate from '@/pages/Order/PayObligate'
import Compare from '@/pages/Order/Compare'
import Zbdetail from '@/pages/Order/Zbdetail'
import MsgAll from '@/pages/Center/MsgAll'
import MsgOrder from '@/pages/Center/MsgOrder'
import MsgUnread from '@/pages/Center/MsgUnread'
import MsgNotice from '@/pages/Center/MsgNotice'
import SettingSite from '@/pages/Center/SettingSite'
import SettingSiteadd from '@/pages/Center/SettingSiteadd'
import SettingSiteup from '@/pages/Center/SettingSiteup'
import CarAuthentic from '@/pages/Center/CarAuthentic'
import CarAdmini from '@/pages/Center/CarAdmini'
import CarScreen from '@/pages/Center/CarScreen'
import CarInsurance from '@/pages/Center/CarInsurance'
import CarEcho from '@/pages/Center/CarEcho'
import OrderAll from '@/pages/Center/OrderAll'
import OrderDetail from '@/pages/Center/OrderDetail'
import LogisticsDetail from '@/pages/Center/LogisticsDetail'
import OrderInvoice from '@/pages/Center/OrderInvoice'
import OrderPickone from '@/pages/Center/OrderPickone'
import OrderInvoices from '@/pages/Center/OrderInvoices'
import OrderPickones from '@/pages/Center/OrderPickones'
import UserMsg from '@/pages/Center/UserMsg'
import AccountSafety from '@/pages/Center/AccountSafety'
import AmendPsd from '@/pages/Center/AmendPsd'
import InsuranceIndex from '@/pages/Insurance/InsuranceIndex'
import InsuranceDetail from '@/pages/Insurance/InsuranceDetail'
import InsurancePay from '@/pages/Insurance/InsurancePay'
import InsuranceBusiness from '@/pages/Insurance/InsuranceBusiness'
import InsurancePersonal from '@/pages/Insurance/InsurancePersonal'
import InsuranceBusPay from '@/pages/Insurance/InsuranceBusPay'

//二级路由（导入文件）
import Mall from '@/pages/Mall/Mall'
import Articles from '@/pages/Articles/Articles'
import Trolley from '@/pages/Trolley/Trolley'
import Center from '@/pages/Center/Center'
import ScreenAdvanced from '@/pages/Mall/components/ScreenAdvanced'

Vue.use(Router)

export default new Router({
  routes: [
    // 路由重定向
    {
      path: '/',
      redirect: '/Mall',
    },
    // 首页
    {
      path: '/',
      name: 'TabBar',
      component: TabBar,
      children: [
        // 汽车商城页
        {
          path: '/Mall',
          name: 'Mall',
          component: Mall,
          meta: {
            scollTopPosition: 0 // 记录页面高度
          },
        },
        // 汽车文章页
        {
          path: '/Articles',
          name: 'Articles',
          component: Articles,
          meta: {
            scollTopPosition: 0 // 记录页面高度
          },
        },
        // 购物车页
        {
          path: '/Trolley',
          name: 'Trolley',
          component: Trolley,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 个人中心页
        {
          path: '/Center',
          name: 'Center',
          component: Center,
        }

      ]
    },
    // 保险页
    {
      path: '/insind',
      name: 'InsuranceIndex',
      component: InsuranceIndex,
    },
    // 保险详情页
    {
      path: '/insdet',
      name: 'InsuranceDetail',
      component: InsuranceDetail,
    },
    // 保险详情页
    {
      path: '/inspay',
      name: 'InsurancePay',
      component: InsurancePay,
    },
    // 商业险资料
    {
      path: '/insbus',
      name: 'InsuranceBusiness',
      component: InsuranceBusiness,
    },
		// 保险人信息提交
		{
		  path: '/insper',
		  name: 'InsurancePersonal',
		  component: InsurancePersonal,
		},
    // 商业险支付InsuranceBusPay
    {
      path: '/insbuspay',
      name: 'InsuranceBusPay',
      component: InsuranceBusPay,
    },
    // APP下载页
    {
      path: '/Download',
      name: 'Download',
      component: Download,
    },
    // 搜索页商城
    {
      path: '/MallSearchs',
      name: 'MallSearchs',
      component: MallSearchs,
      meta: {
        scollTopPosition: 0 // 记录页面高度
      },
    },
    // 搜索页文章
    {
      path: '/ArticlesSearchs',
      name: 'ArticlesSearchs',
      component: ArticlesSearchs,
      meta: {
        scollTopPosition: 0 // 记录页面高度
      },
    },
    // 商城品牌页
    {
      path: '/MallBrand',
      name: 'MallBrand',
      component: MallBrand
    },
    //商城高级筛选页
    {
      path: '/MallScreen',
      name: 'MallScreen',
      component: MallScreen,
      children: [
        //高级筛选详情页（系类、年款、版本、车价、外观、内饰、排量、燃油、环保）
        {
          path: '/ScreenAdvanced',
          name: 'ScreenAdvanced',
          component: ScreenAdvanced
        }
      ]
    },
    //商品详情页
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
      children: [
        //查看全部参数
        {
          path: '/DetailParameterMore',
          name: 'DetailParameterMore',
          component: DetailParameterMore
        },
      ]
    },
    //查看详细配置
    {
      path: '/DetailConfMore',
      name: 'DetailConfMore',
      component: DetailConfMore
    },
    //文章详情页
    {
      path: '/ArticlesDetail',
      name: 'ArticlesDetail',
      component: ArticlesDetail
    },
    //文章品牌页
    {
      path: '/ArticlesBrand',
      name: 'ArticlesBrand',
      component: ArticlesBrand
    },
    //短信登录
    {
      path: '/AccountLoginMsg',
      name: 'AccountLoginMsg',
      component: AccountLoginMsg
    },
    //登陆
    {
      path: '/AccountLogin',
      name: 'AccountLogin',
      component: AccountLogin
    },
    //注册
    {
      path: '/AccountReg',
      name: 'AccountReg',
      component: AccountReg,
    },
    //注册协议
    {
      path: '/AccountProtocol',
      name: 'AccountProtocol',
      component: AccountProtocol,
    },
    //三方登录qq_login
    {
      path: '/qq_login',
      name: 'qq_login',
      component: qq_login,
    },
    //三方登录绑定qq_binding
    {
      path: '/qq_binding',
      name: 'qq_binding',
      component: qq_binding,
    },
    //三方登录绑定wx_binding
    {
      path: '/wx_binding',
      name: 'wx_binding',
      component: wx_binding,
    },
    //忘记密码
    {
      path: '/AccountReset',
      name: 'AccountReset',
      component: AccountReset,
    },
    //提车页面
    {
      path: '/OrderAddr',
      name: 'OrderAddr',
      component: OrderAddr,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //保险页面
    {
      path: '/OrderIns',
      name: 'OrderIns',
      component: OrderIns,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //质保详情页
    {
      path: '/Zbdetail',
      name: 'Zbdetail',
      component: Zbdetail,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //配件升级
    {
      path: '/OrderUpd',
      name: 'OrderUpd',
      component: OrderUpd,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //汇总页面
    {
      path: '/OrderSum',
      name: 'OrderSum',
      component: OrderSum,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //购买协议页面
    {
      path: '/OrderXieyi',
      name: 'OrderXieyi',
      component: OrderXieyi,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //对比页面
    {
      path: '/Compare',
      name: 'Compare',
      component: Compare,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //支付页面
    {
      path: '/PayOrder',
      name: 'PayOrder',
      component: PayOrder,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //快捷支付
    {
      path: '/PayShortcut',
      name: 'PayShortcut',
      component: PayShortcut,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //快捷支付成功
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //快捷支付失败
    {
      path: '/PayError',
      name: 'PayError',
      component: PayError,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },

    //支付预留信息
    {
      path: '/PayObligate',
      name: 'PayObligate',
      component: PayObligate,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //系统公告
    {
      path: '/MsgNotice',
      name: 'MsgNotice',
      component: MsgNotice,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //车辆管理
    {
      path: '/CarAdmini',
      name: 'CarAdmini',
      component: CarAdmini,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //新增车辆
    {
      path: '/CarScreen',
      name: 'CarScreen',
      component: CarScreen,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //未读信息
    {
      path: '/MsgUnread',
      name: 'MsgUnread',
      component: MsgUnread,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //全部信息
    {
      path: '/MsgAll',
      name: 'MsgAll',
      component: MsgAll,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //订单信息
    {
      path: '/MsgOrder',
      name: 'MsgOrder',
      component: MsgOrder,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //收货地址
    {
      path: '/SettingSite',
      name: 'SettingSite',
      component: SettingSite,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //新增地址
    {
      path: '/SettingSiteadd',
      name: 'SettingSiteadd',
      component: SettingSiteadd,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //车主认证
    {
      path: '/CarAuthentic',
      name: 'CarAuthentic',
      component: CarAuthentic,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //查看审核资料
    {
      path: '/CarEcho',
      name: 'CarEcho',
      component: CarEcho,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //查看保险
    {
      path: '/CarInsurance',
      name: 'CarInsurance',
      component: CarInsurance,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //全部订单
    {
      path: '/OrderAll',
      name: 'OrderAll',
      component: OrderAll,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //订单详情
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //物流详情
    {
      path: '/LogisticsDetail',
      name: 'LogisticsDetail',
      component: LogisticsDetail,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //提交接车人信息
    {
      path: '/OrderPickone',
      name: 'OrderPickone',
      component: OrderPickone,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //提交发票信息
    {
      path: '/OrderInvoice',
      name: 'OrderInvoice',
      component: OrderInvoice,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //查看接车人信息
    {
      path: '/OrderPickones',
      name: 'OrderPickones',
      component: OrderPickones,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //查看提交发票信息
    {
      path: '/OrderInvoices',
      name: 'OrderInvoices',
      component: OrderInvoices,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //修改地址
    {
      path: '/SettingSiteup',
      name: 'SettingSiteup',
      component: SettingSiteup,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //个人信息
    {
      path: '/UserMsg',
      name: 'UserMsg',
      component: UserMsg,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //账号安全管理
    {
      path: '/AccountSafety',
      name: 'AccountSafety',
      component: AccountSafety,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //修改密码
    {
      path: '/AmendPsd',
      name: 'AmendPsd',
      component: AmendPsd,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})

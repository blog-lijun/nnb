/**
 * 小程序配置文件
 */

const host = "https://www.phplijun.cn";
// const host = "https://lijun.phplijun.cn";
const config = {
  // 下面的地址配合云端 Server 工作
  host,
  // 账号密码登录
  login: `${host}/api/xcx/login`,
  //获取openid
  openid: `${host}/api/xcx/openId`,
  //获取用户手机号
  getPhoneNumber: `${host}/api/xcx/getPhoneNumber`,
  // 获取验证码
  code: `${host}/api/xcx/code`,
  // 注册验证
  verifyRegister: `${host}/api/xcx/verifyRegister`,
  // 注册，新建账号
  register: `${host}/api/xcx/register`,
  // 验证码登录
  codeLogin: `${host}/api/xcx/codeLogin`,
  // 重置密码
  reset: `${host}/api/xcx/reset`,
  // 验证码登录
  codeLogin: `${host}/api/xcx/codeLogin`,
  // 获取绑定企业的列表
  getBindLists: `${host}/api/xcx/getBindLists`,
  // 新增绑定关系
  bind: `${host}/api/xcx/bind`,
  // 插入咨询信息
  zxInsert: `${host}/api/xcx/zxInsert`,
  //配置信息加载
  getConfig: `${host}/api/xcx/getConfig`,
  getConfigHot: `${host}/api/xcx/getConfigHot`,
  csxt: `${host}/api/xcx/csxt`,
  //产品二级分类页面;
  productions: `${host}/api/xcx/productions`,
  //获取资讯详情;
  getZx: `${host}/api/xcx/getZx`,
};

module.exports = config;

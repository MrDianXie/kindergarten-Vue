const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 代理服务器进行跨域
// module.exports = {
//   devServer:{
//     //本地地址
//     host: 'localhost',
//     port: 8080,
//     //配置代理
//     proxy: {
//       '/apl':{
//         target: "http://localhost:8090",
//         changeOrigin: true
//       }
//     }
//   }
// }


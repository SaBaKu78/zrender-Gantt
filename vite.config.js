import {defineConfig} from "vite";
import {resolve} from "path";
const replace = require('@rollup/plugin-replace');
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig({
    cacheDir: ".vite-cache",
    server:{
        host: '127.0.0.1',
        port:8099,
        proxy: {
          '/resource': {
            target: 'http://127.0.0.1:5001',
            changeOrigin: true
          },
          '/basedata': {
            target: 'http://127.0.0.1:5001',
            changeOrigin: true
          }
        }
    },
    plugins:[
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    build:{
        target:"es2015",
        lib:{
            entry:resolve(__dirname,'src/core/Gantt.ts'),
            name:'Gantt',
            formats:['iife','es','cjs']
        },
        outDir:'dist',
        rollupOptions:{
            external:['zrender','moment'],
            plugins:[
                externalGlobals({
                    moment:"moment",
                    zrender:"zrender"
                })
            ]
        }
    }
})

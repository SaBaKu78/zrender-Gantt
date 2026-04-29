import {defineConfig} from "vite";
import {resolve} from "path";
const replace = require('@rollup/plugin-replace');
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig({
    server:{
        port:8099
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
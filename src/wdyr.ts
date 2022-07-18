import React from "react";
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV === 'development') {
    whyDidYouRender(React, {
        //跟踪所有的函数组件
        trackAllPureComponents: false,
    });
}
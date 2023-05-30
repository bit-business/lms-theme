module.exports = {
    content: [
        "package/skijasi/lms-theme/src/resources/views/**/*.blade.php",
        "package/skijasi/lms-theme/src/resources/**/*.js",
        "package/skijasi/lms-theme/src/resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontSize: {
                'xs': '.75rem', //12px
                'sm': '.875rem', //14px
                'base': ['1.125rem', '1.625rem'], // 18px
                'lg': ['1.5rem', '2.1rem'], // 24px
                'very-lg': ['2rem', '2.8rem'],// 32px
                'semi-xl': ['2.5rem', '3rem'],
                'xl': ['4rem', '5rem'], // 64px
            },
            colors: {
                primary: '#06BBD3',
                secondary: '#0596A9',
                light: '#E6F8FB',
                black: '#0F0F0F',
                error: '#FF5252',
                success: '#46C93A',
                gray: '#CECECE',
                textGray: '#AEAEAE',
                white: '#FEFEFE',
            },
            dropShadow: {
                '1sm': '0px 4px 20px 5px rgba(0, 0, 0, 0.1)'
            }
        },
    },
    variants: {
        extend: {
            scale: ['active']
        }
    },
    plugins: [],
};



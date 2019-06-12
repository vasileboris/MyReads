import React from 'react';
import Markdown from 'react-native-simple-markdown';
import AssetImage from 'components/image/AssetImage';

const rules={
    image: {
        react: (node, output, state) => (
            <AssetImage
                key={state.key}
                image={node.target}
            />
        ),
    },
};

const copy = `
#Markdown in react-native is so cool!

![Some GIF](book.png)

You can **emphasize** what you want, or just _suggest it_ 😏…

You can even [**link your website**](https://twitter.com/Charles_Mangwa) or if you prefer: [email somebody](mailto:email@somebody.com)

Spice it up with some GIFs 💃:

![Some GIF](book.png)

`;


const Help = props => {
    return <Markdown rules={rules}>{copy}</Markdown>;
};

export default Help;

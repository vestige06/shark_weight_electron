import React from 'react';
interface LuckSheetProps {
    luckyCss?: object;
}
declare class LuckySheet extends React.Component<any, LuckSheetProps> {
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default LuckySheet;

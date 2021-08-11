import React from 'react';
import './squareBtn.css';
interface squareBtnProp {
    icon: string;
    feature: string;
}
declare class squareBtn extends React.Component<any, squareBtnProp> {
    constructor(props: any);
    getIcon(): JSX.Element;
    render(): JSX.Element;
}
export default squareBtn;

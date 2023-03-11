/// <reference types="react" />
import '../index.css';
declare const FidbackHub: ({ apiKey, height }: FidbackHubProps) => JSX.Element;
type FidbackHubProps = {
    apiKey: string;
    height?: number;
};
export default FidbackHub;

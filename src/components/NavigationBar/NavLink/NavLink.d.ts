declare namespace INavLink {
    export interface IProps {
        to: string,
        className: string,
        text: string,
        onClick: () => void
    }
}

export { INavLink }; 
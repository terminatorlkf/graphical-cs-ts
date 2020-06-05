import React from "react";
import { ThemeProvider } from "@rmwc/theme";
import { Tooltip } from "@rmwc/tooltip";
import { Fab } from "@rmwc/fab";

interface AddNodeButtonProps {
    onClick: () => void
}

const AddNodeButton: React.FunctionComponent<AddNodeButtonProps> = ({ onClick }) => {
    return (
        <div className="add-node-button">
            <ThemeProvider
                options={{
                    secondary: '#df350f'
                }}
            >
                <Tooltip content="add node" showArrow>
                    <Fab onClick={onClick} icon={{
                        icon: 'add',
                    }} />
                </Tooltip>

            </ThemeProvider>

            <style jsx>
                {`
                .add-node-button {
                position: fixed;

                right: 5rem;
                bottom: 3rem;

                margin-top: 40px;
                }
                `}
            </style>
        </div>
    );

}

export default AddNodeButton;
import styled from "styled-components";
import Tick from "./assets/tick.svg"
import Edit from "./assets/edit.svg";
import Close from "./assets/close.svg";

const Text = styled.span`
    border-bottom: 1px dashed #BBB;
    outline: none;
    display: inline-block;
`;

const Container = styled.span`
    font-size: 14px;
    font-family: sans-serif;
    position: relative;
    .icon-edit {
        heght: 10px;
        width: 10px;
        margin-left: 10px;
    }
`;


const Action = styled.span`
    position: absolute;
    right: -40px;
    top: 0;
    display: flex;
    a {
        height: 10px;
        width: 10px;
        display: inline-block;
        cursor: pointer;
        padding: 4px;
        line-height: 10px;
        transition: all .3s;
        border-radius: 90%;
        text-align: center;
        &:hover {
            fill: #fff;
        }
        &.ok:hover {
            background-color: #007bff;
        }
        &.cancel:hover {
            background-color: #dc3545;
        }
    }
`;

class Editable extends React.Component {
    state = {
        focused: false
    }

    handleFocus = () => {
        this.setState({focused: true});
    }

    handleBlur = () => {
        // this.setState({focused: false});
    }

    handleOk = () => {
        this.setState({focused: false});
    }

    handleCancel = () => {
        this.el.innerText = this.props.children;
        this.setState({focused: false});
        this.el.blur();
    }

    handleKeyPresss = (e) => {
       if (e.key == "Enter") {
           e.preventDefault();
           this.el.blur();
           this.setState({focused: false});
       }
    }

    handleKeyUp = (e) => {
        if (e.key === "Escape") {
            this.handleCancel();
        }
    }

    render() {
        return (
            <Container>
                <Text onKeyUp={this.handleKeyUp} ref={e => this.el = e} onKeyPress={this.handleKeyPress} contentEditable dangerouslySetInnerHTML={{__html: this.props.children}} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                { this.state.focused ? <Action>
                    <a onClick={this.handleOk} className="ok"><Tick /></a>
                    <a onClick={this.handleCancel} className="cancel"><Close /></a>
                </Action> : <Edit className="icon-edit" /> }
            </Container>
        )
    }
}
export default Editable;
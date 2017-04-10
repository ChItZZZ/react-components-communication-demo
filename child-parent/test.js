// 父组件
class MyContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onChildChanged = this.onChildChanged.bind(this)
        this.state = {
            totalChecked: 0
        }
    }
    onChildChanged(newState) {
        var newToral = this.state.totalChecked + (newState ? 1 : -1);
        this.setState({
            totalChecked: newToral
        });
    }
    render() {
        var totalChecked = this.state.totalChecked;
        return (
            <div>
                <div>How many are checked: {totalChecked}</div>
                <ToggleButton text="Toggle me"
                              initialChecked={this.state.checked}
                              callbackParent={this.onChildChanged}
                />
                <ToggleButton text="Toggle me too"
                              initialChecked={this.state.checked}
                              callbackParent={this.onChildChanged}
                />
                <ToggleButton text="And me"
                              initialChecked={this.state.checked}
                              callbackParent={this.onChildChanged}
                />
            </div>
        );
    }

}

// 子组件

class ToggleButton extends React.Component {
    constructor(props){
        super(props)
        this.onTextChange = this.onTextChange.bind(this)
        this.state = {
            checked: this.props.initialChecked
        }
    }

    onTextChange() {
        var newState = !this.state.checked;
        this.setState({
            checked: newState
        });
        // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
        this.props.callbackParent(newState);
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({
                checked: true
            })
        }.bind(this), 4000)
    }

    render() {
        // 从【父组件】获取的值
        var text = this.props.text;
        // 组件自身的状态数据
        var checked = this.state.checked;

        return (
            <label>{text}: <input type="checkbox" checked={checked} onChange={this.onTextChange}/></label>
        );
    }

}

React.render(
    <MyContainer/>,
    document.getElementById('container')
);
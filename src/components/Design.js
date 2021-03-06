import React from 'react'
import 'bulma/css/bulma.css'
import 'bulma-extensions/dist/css/bulma-extensions.min.css'


class TextInputForm extends React.Component {
    constructor() {
        super()
        this.state = {
            text: "",
            isText: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmit({
            text: this.state.text,
            fieldType: this.state.isText ? "T" : "R"
        })
        this.setState({ text: "" })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <input
                        id="switchRoundedInfo"
                        type="checkbox"
                        name="switchRoundedInfo"
                        className="switch is-rounded is-info"
                        checked={this.state.isText}
                        onChange={() => this.setState(prevState=>({isText: !prevState.isText}))}
                    />
                    <label htmlFor="switchRoundedInfo">
                        {this.state.isText ? "Switch to Checkbox" : "Switch to Textbox"}
                    </label>
                </div>

                <div className="field">
                    <label className="label">{this.state.isText ? "Text" : "Choice"} Question</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Question Text"
                            value={this.state.text}
                            name="text"
                            onChange={this.handleChange}
                            required={true}
                        />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Add</button>
                    </div>
                </div>
            </form>
        )
    }
}


class Option extends React.Component {
    constructor() {
        super()
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {value, name} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmit({
            event: event,
            fieldId: this.props.field.id,
            value: this.state.value
        })
        this.setState({ value: ""})
    }

    render() {
        const options = this.props.options.map(opt => <li key={opt.id}>{opt.value} </li>)
        return (
            <li>
                <form onSubmit={this.handleSubmit}>
                    Choice Question:
                    <label>
                        <strong>{this.props.field.text}</strong>
                        <br />

                        <ul>
                            {options}
                        </ul>
                        {options.length === 0 ? "No options added yet" : null}

                        <div className="field">
                            <label className="label">Option</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Choice"
                                    value={this.state.value}
                                    name="value"
                                    onChange={this.handleChange}
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-small is-link">Add</button>
                            </div>
                        </div>
                    </label>
                </form>
            </li>
        )
    }
}

class Design extends React.Component {
    constructor() {
        super()
        this.state = {
            text: "",
            isText: true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const {value, name} = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        let components
        try {
            components = this.props.form.fields.map(field => {
                if(field.field === "T")
                    return <li key={field.id}>Text Question: <strong>{field.text}</strong></li>
                else if(field.field === "R")
                    return <Option
                        key={field.id}
                        options={field.options}
                        field={field}
                        onSubmit={
                            (args) => {
                                args["formId"] = this.props.form.id
                                this.props.onOptionSubmit(args)
                            }
                        }
                    />
                else
                    throw new Error("Unexpted field type in Design Form Rendering")
            })
        }
        catch(err) {
            alert(err)
        }

        return (
            <div>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            Design Form: <strong>{this.props.form.name}</strong>
                        </p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <ol>
                                {components}
                            </ol>
                            {components.length === 0 ? "Add Textboxes or Checkboxes to continue" : null}
                            <br />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            Create New Field / Question
                        </p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <TextInputForm
                                onSubmit={
                                    (args) => {
                                        args["formId"] = this.props.form.id
                                        this.props.onTextSubmit(args)
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Design
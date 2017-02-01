import React, { Component } from 'react';
import './MarkerForm.css';

export default class MarkerForm extends Component {
  constructor(props) {
    super(props)

    const { markerKey } = this.props;

    if(markerKey) {

      // editing existing marker
      this.state = {
        name: this.props.marker && this.props.marker.name,
        description: this.props.marker && this.props.marker.description
      }
    } else {
      this.state = {
        name: '',
        description: ''
      }
    }


    this.handleChange = this.handleChange.bind(this);
    this.handeSubmit = this.handeSubmit.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState( {
      [name]: value
    } )
  }

  handleCloseClick( event ) {
    this.props.onClose()
    event.preventDefault();
  }

  handeSubmit(event) {
    const marker = this.state;
    const { onMarkerSubmit } = this.props;

    onMarkerSubmit( marker );
    event.preventDefault();
  }

  render() {
    const { markerKey } = this.props;
    const marker = this.state;
    return (
    <form onSubmit={ this.handeSubmit } className='MarkerForm'>
      <button
        className='MarkerForm_closeButton'
        onClick={ this.handleCloseClick }
      >
        &times;
      </button>
      <input
        value={ marker.name }
        onChange={ this.handleChange }
        name='name'
        className='MarkerForm_input'
        id="input-name"
        type="text"
        placeholder="My favorite place"
        required
        autoFocus
      />
      <label className='MarkerForm_labelBox' htmlFor="input-name">
        <span className='MarkerForm_labelText'>Name</span>
      </label>
      <input
        value={ marker.description }
        onChange={ this.handleChange }
        name='description'
        className='MarkerForm_input'
        id="input-description"
        type="text"
        placeholder="Awesome pizza"
        required
      />
      <label className='MarkerForm_labelBox' htmlFor="input-description">
        <span className='MarkerForm_labelText'>Description</span>
      </label>
      <button className='MarkerForm_submitButton' type="submit">{ markerKey? 'Save': 'Create marker'}</button>
    </form>
    )
  }
}

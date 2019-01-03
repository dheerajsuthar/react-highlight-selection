import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    customClass: PropTypes.string,
    selectionHandler: PropTypes.func
};

/**
 * Highlighter component.
 * 
 * Allows highlighting of the text selected by mouse with given custom class (or default)
 * and calls optional callback function with the following selection details:
 * - selected text
 * - selection start index 
 * - selection end index
 */
export default class HighLighter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            isDirty: false,
            selection: '',
            anchorNode: '?',
            focusNode: '?',
            selectionStart: '?',
            selectionEnd: '?',
            first: '',
            middle: '',
            last: ''
        };
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
    }

    onMouseUpHandler(e) {
        e.preventDefault();
        const selectionObj = (window.getSelection && window.getSelection());
        const selection = selectionObj.toString();
        const anchorNode = selectionObj.anchorNode;
        const focusNode = selectionObj.focusNode;
        const anchorOffset = selectionObj.anchorOffset;
        const focusOffset = selectionObj.focusOffset;
        const position = anchorNode.compareDocumentPosition(focusNode);
        let forward = false;

        if (position === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
            forward = true;
        } else if (position === 0) {
            forward = (focusOffset - anchorOffset) > 0;
        }

        let selectionStart = forward ? anchorOffset : focusOffset;

        if (forward) {
            if (anchorNode.parentNode.getAttribute('data-order')
                && anchorNode.parentNode.getAttribute('data-order') === 'middle') {
                selectionStart += this.state.selectionStart;
            }
            if (anchorNode.parentNode.getAttribute('data-order')
                && anchorNode.parentNode.getAttribute('data-order') === 'last') {
                selectionStart += this.state.selectionEnd;
            }
        } else {
            if (focusNode.parentNode.getAttribute('data-order')
                && focusNode.parentNode.getAttribute('data-order') === 'middle') {
                selectionStart += this.state.selectionStart;
            }
            if (focusNode.parentNode.getAttribute('data-order')
                && focusNode.parentNode.getAttribute('data-order') === 'last') {
                selectionStart += this.state.selectionEnd;
            }
        }

        const selectionEnd = selectionStart + selection.length;
        const first = this.state.text.slice(0, selectionStart);
        const middle = this.state.text.slice(selectionStart, selectionEnd);
        const last = this.state.text.slice(selectionEnd);

        this.setState({
            selection,
            anchorNode,
            focusNode,
            selectionStart,
            selectionEnd,
            first,
            middle,
            last
        });

        if (this.props.selectionHandler) {
            this.props.selectionHandler({
                selection,
                selectionStart,
                selectionEnd
            });
        }

    }

    render() {
        if (!this.state.selection) {
            return (
                <span
                    onMouseUp={this.onMouseUpHandler}>{this.state.text}
                </span>
            )
        } else {
            return (
                <span
                    onMouseUp={this.onMouseUpHandler}>
                    <span
                        data-order="first" >
                        {this.state.first}
                    </span>
                    <span
                        data-order="middle"
                        className={this.props.customClass || "default"}>
                        {this.state.middle}
                    </span>
                    <span
                        data-order="last">
                        {this.state.last}
                    </span>
                </span>
            )
        }

    }
}

HighLighter.propTypes = propTypes;
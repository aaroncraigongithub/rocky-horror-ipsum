import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Card,
  CardTitle,
  CardText,
  Divider,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
} from 'material-ui';
import getIpsum from '../services/IpsumService';

injectTapEventPlugin();

const theme = getMuiTheme({
  palette: {
    primary1Color:      '#b71c1c',
    primary2Color:      '#484848',
    primary3Color:      '#000',
    accent1Color:       '#b71c1c',
    accent2Color:       '#f05545',
    accent3Color:       '#7f0000',
    textColor:          '#212121',
    alternateTextColor: '#eee',
    canvasColor:        '#fff',
    borderColor:        '#ffebee',
    disabledColor:      'rgba(21, 21, 21, 0.3)',
    pickerHeaderColor:  '#fff',
    clockCircleColor:   'rgba(21, 21, 21, 0.7)',
    shadowColor:        '#000',
  },
});

const Content = ({ children }) => (
  <div style={{ padding: 20 }}>
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([
      PropTypes.element,
      PropTypes.node,
    ]),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

class App extends Component {
  constructor() {
    super();

    this.onParagraphCountSelect = this.onParagraphCountSelect.bind(this);
    this.onParagraphSizeSelect = this.onParagraphSizeSelect.bind(this);
    this.onIpsum = this.onIpsum.bind(this);

    this.keyIndex = 0;

    this.state = {
      lorem: [],
      paras: 1,
      size:  'short',
    };
  }

  onParagraphSizeSelect(evt, value) {
    this.setState({ size: value });
  }

  onParagraphCountSelect(evt, value) {
    this.setState({ paras: Number(value) });
  }

  onIpsum() {
    this.setState({ lorem: getIpsum(this.state.paras, this.state.size) });
  }

  key() {
    this.keyIndex += 1;

    return `para-${this.keyIndex}`;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Card>
          <CardTitle
            title="Rocky Horror ipsum generator"
          />
          <CardText>
            Set your settings and get your lorem ipsum.
          </CardText>
          <Divider />
          <Content>
            <RadioButtonGroup
              defaultSelected="short"
              name="paragraphSize"
              onChange={this.onParagraphSizeSelect}
            >
              <RadioButton value="short" label="short paragraphs" />
              <RadioButton value="long" label="long paragraphs" />
            </RadioButtonGroup>
          </Content>
          <Content>
            <RadioButtonGroup
              defaultSelected="1"
              name="paragraphCount"
              onChange={this.onParagraphCountSelect}
            >
              <RadioButton value="1" label="one paragraph" />
              <RadioButton value="3" label="three paragraphs" />
              <RadioButton value="5" label="five paragraphs" />
            </RadioButtonGroup>
          </Content>
          <Content>
            <RaisedButton
              onTouchTap={this.onIpsum}
              label="Make ipsum"
              primary
            />
          </Content>
          <Divider />
          {
            this.state.lorem.length > 0 &&
              <Content>
                {
                  this.state.lorem.map(para => (
                    <p key={this.key()}>{para}</p>
                  ),
                )
              }
              </Content>
          }
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default App;

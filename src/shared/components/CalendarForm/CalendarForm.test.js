import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../../store/actions/reminderActions';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import AlgoliaPlaces from 'algolia-places-react';
import EnzymeToJson from 'enzyme-to-json';
import CalendarForm from './CalendarForm';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Button,
  Container
} from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react';

configure({ adapter: new Adapter() });

const mockStore = configureStore();

const store = mockStore({
  reminders: {
    items: {
      '1-9-2020': [
        { title: 'test reminder 1', id: '1-9-2020_0' },
        { title: 'test reminder2', id: '1-9-2020_1' }
      ]
    },
    shouldDisplayModal: true
  }
});

const selectedReminder = {
  title: 'test reminder 1',
  id: '1-9-2020_0',
  username: 'test username',
  city: 'Barcelona'
};

let component;

let addReminderProps = {
  isUpdatingReminder: false,
  selectedDate: '1-9-2020',
  selectedReminder: null
};

let updateReminderProps = {
  isUpdatingReminder: true,
  selectedDate: '1-9-2020',
  selectedReminder: selectedReminder
};

describe('CalendarForm [Component]', () => {
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <CalendarForm {...addReminderProps} />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('should be rendered', () => {
    expect(EnzymeToJson(component)).toMatchSnapshot();
  });

  it('should have a disabled and populated text field for date', () => {
    const dateInput = component.find(TextField).first();

    const selectedDate = '1-9-2020';

    expect(dateInput.props().value).toEqual(selectedDate);
    expect(dateInput.props().disabled).toBeTruthy();
  });

  it('should have a text field for reminder date, title, username and time', () => {
    expect(component.find(TextField).length).toEqual(4);
  });

  it('should have an autocomplete field for city', () => {
    expect(component.find(AlgoliaPlaces).length).toEqual(1);
  });

  it('should have a radio group for selecting a priority level (color) and have 3 options', () => {
    const radioGroup = component.find(RadioGroup);
    expect(radioGroup.length).toEqual(1);
    expect(radioGroup.find(FormControlLabel).length).toEqual(3);
  });

  it('should have 2 buttons (Add Reminder and Cancel) when date selected and no reminder is selected', () => {
    const buttons = component.find(Button);
    expect(buttons.length).toEqual(2);
    expect(buttons.children().getElements()[0].props.children).toEqual(
      'Add Reminder'
    );
    expect(buttons.children().getElements()[1].props.children).toEqual(
      'Cancel'
    );
  });

  it('should have red (high priority), yellow (Priority) and green (low Priority) in radio buttons', () => {
    const radioValues = ['red', 'yellow', 'green'];
    const radioLabels = ['High Priority', 'Priority', 'Low Priority'];
    let itemProps = {};
    component
      .find(FormControlLabel)
      .getElements()
      .map((item, index) => {
        itemProps = item.props;
        expect(itemProps.value).toEqual(radioValues[index]);
        expect(itemProps.label).toEqual(radioLabels[index]);
      });
  });

  it('should dispatch add reminder action when creating new reminder', () => {
    sinon.spy(actions, 'addReminder');

    let usernameField = component.find(TextField).at(1);
    let reminderTitle = component.find(TextField).at(2);

    act(() => {
      usernameField.props().onChange({ target: { value: 'username test ' } });
    });
    component.update();

    usernameField = component.find(TextField).at(1);
    reminderTitle = component.find(TextField).at(2);

    act(() => {
      reminderTitle.props().onChange({ target: { value: 'title test' } });
    });
    component.update();

    let cityField = component.find(AlgoliaPlaces).first();

    act(() => {
      cityField
        .props()
        .onChange({ suggestion: { name: 'Barcelona, Catalunya, Spain' } });
    });

    component.update();

    component
      .find(Button)
      .first()
      .simulate('click');

    expect(actions.addReminder.calledOnce).toBeTruthy();
  });

  it('should dispatch close modal action when closing form', () => {
    sinon.spy(actions, 'closeModal');
    component
      .find(Button)
      .at(1)
      .simulate('click');

    expect(actions.closeModal.calledOnce).toBeTruthy();
  });
});

describe('CalendarForm updating Reminder [component]', () => {
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <CalendarForm {...updateReminderProps} />
      </Provider>
    );
  });

  it('should have an update reminder button when a reminder is selected', () => {
    const buttons = component.find(Button);
    expect(buttons.length).toEqual(3);
    expect(buttons.children().getElements()[0].props.children).toEqual(
      'Update Reminder'
    );
  });

  it('should have an additional delete button when a reminder is selected', () => {
    const buttons = component.find(Button);
    expect(buttons.length).toEqual(3);
    expect(buttons.children().getElements()[1].props.children).toEqual(
      'Delete'
    );
  });

  it('should dispatch update reminder action when editing existing reminder', () => {
    sinon.spy(actions, 'updateReminder');

    component
      .find(Button)
      .first()
      .simulate('click');
    expect(actions.updateReminder.calledOnce).toBeTruthy();
  });

  it('should dispatch delete reminder action when removing existing reminder', () => {
    sinon.spy(actions, 'removeReminder');

    component
      .find(Button)
      .at(1)
      .simulate('click');

    expect(actions.removeReminder.calledOnce).toBeTruthy();
  });
});

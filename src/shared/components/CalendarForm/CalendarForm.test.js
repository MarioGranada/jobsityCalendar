import React from 'react';
import { mount, configure } from 'enzyme';
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
  Button
} from '@material-ui/core';

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

const selectedReminder = { title: 'test reminder 1', id: '1-9-2020_0' };

describe('CalendarForm [Component]', () => {
  it('should be rendered', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );
    expect(EnzymeToJson(component)).toMatchSnapshot();
  });

  it('should have a disabled and populated text field for date', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );
    const dateInput = component.find(TextField).first();

    const selectedDate = '1-9-2020';

    expect(dateInput.props().value).toEqual(selectedDate);
    expect(dateInput.props().disabled).toBeTruthy();
  });

  it('should have a text field for reminder date, title, username and time', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );
    expect(component.find(TextField).length).toEqual(4);
  });

  it('should have an autocomplete field for city', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );
    expect(component.find(AlgoliaPlaces).length).toEqual(1);
  });

  it('should have a radio group for selecting a priority level (color) and have 3 options', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );
    const radioGroup = component.find(RadioGroup);
    expect(radioGroup.length).toEqual(1);
    expect(radioGroup.find(FormControlLabel).length).toEqual(3);
  });

  it('should have 2 buttons (Add Reminder and Cancel) when date selected and no reminder is selected', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );
    const buttons = component.find(Button);
    expect(buttons.length).toEqual(2);
    expect(buttons.children().getElements()[0].props.children).toEqual(
      'Add Reminder'
    );
    expect(buttons.children().getElements()[1].props.children).toEqual(
      'Cancel'
    );
  });

  it('should have an update reminder button when a reminder is selected', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={true}
          selectedDate={'1-9-2020'}
          selectedReminder={selectedReminder}
        />
      </Provider>
    );
    const buttons = component.find(Button);
    expect(buttons.length).toEqual(3);
    expect(buttons.children().getElements()[0].props.children).toEqual(
      'Update Reminder'
    );
  });

  it('should have an additional delete button when a reminder is selected', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={true}
          selectedDate={'1-9-2020'}
          selectedReminder={selectedReminder}
        />
      </Provider>
    );
    const buttons = component.find(Button);
    expect(buttons.length).toEqual(3);
    expect(buttons.children().getElements()[1].props.children).toEqual(
      'Delete'
    );
  });

  it('should have red (high priority), yellow (Priority) and green (low Priority) in radio buttons', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );

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
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );

    sinon.spy(actions, 'addReminder');

    component
      .find(Button)
      .first()
      .simulate('click');
    expect(actions.addReminder.calledOnce).toBeTruthy();
  });

  it('should dispatch update reminder action when editing existing reminder', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={true}
          selectedDate={'1-9-2020'}
          selectedReminder={selectedReminder}
        />
      </Provider>
    );

    sinon.spy(actions, 'updateReminder');

    component
      .find(Button)
      .first()
      .simulate('click');
    expect(actions.updateReminder.calledOnce).toBeTruthy();
  });

  it('should dispatch delete reminder action when removing existing reminder', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={true}
          selectedDate={'1-9-2020'}
          selectedReminder={selectedReminder}
        />
      </Provider>
    );

    sinon.spy(actions, 'removeReminder');

    component
      .find(Button)
      .at(1)
      .simulate('click');

    expect(actions.removeReminder.calledOnce).toBeTruthy();
  });

  it('should dispatch close modal action when closing form', () => {
    const component = mount(
      <Provider store={store}>
        <CalendarForm
          isUpdatingReminder={false}
          selectedDate={'1-9-2020'}
          selectedReminder={null}
        />
      </Provider>
    );

    sinon.spy(actions, 'closeModal');
    component
      .find(Button)
      .at(1)
      .simulate('click');

    expect(actions.closeModal.calledOnce).toBeTruthy();
  });
});

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import Calendar from './Calendar';
import CalendarForm from '../CalendarForm/CalendarForm';
import DayPicker from 'react-day-picker';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import * as actions from '../../store/actions/reminderActions';

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
    shouldDisplayModal: false
  }
});

let component;

describe('Calendar [Component]', () => {
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Calendar />
      </Provider>
    );
  });
  it('should be rendered', () => {
    component = renderer.create(
      <Provider store={store}>
        <Calendar />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a CalendarForm component', () => {
    expect(component.find(CalendarForm).length).toEqual(1);
  });

  it('should have a DayPicker component', () => {
    expect(component.find(DayPicker).length).toEqual(1);
  });

  it('should have multiple add icons', () => {
    expect(component.find(AddCircleIcon).length).not.toEqual(0);
  });

  it('should have multiple Clear icons', () => {
    expect(component.find(HighlightOffRoundedIcon).length).not.toEqual(0);
  });

  it('should select given date when an add icon is clicked', () => {
    const firstAddCircleIcon = component.find(AddCircleIcon).first();

    firstAddCircleIcon.simulate('click');

    const clickedDate = firstAddCircleIcon.props().label;

    expect(component.find(CalendarForm).props().selectedDate).toEqual(
      clickedDate
    );
  });

  it('should open a modal when an add icon is clicked', () => {
    sinon.spy(actions, 'openModal');

    const firstAddCircleIcon = component.find(AddCircleIcon).first();

    firstAddCircleIcon.simulate('click');

    expect(actions.openModal.calledOnce).toBeTruthy();
  });

  it('should remove all reminders for a given date when a clear button is clicked', () => {
    sinon.spy(actions, 'removeRemindersByDate');

    const selectedDate = '1-9-2020';

    let remindersContainer = component.find('#day-box_' + selectedDate);

    let clearButton = remindersContainer.find('.clear-date-label').first();

    clearButton.simulate('click');

    expect(
      actions.removeRemindersByDate.calledOnceWith(selectedDate)
    ).toBeTruthy();
  });
});

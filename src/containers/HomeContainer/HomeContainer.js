import React, { PureComponent } from 'react';
import Calendar from '../../shared/components/Calendar/Calendar';

class HomeContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      reminders: []
    };
  }

  render() {
    return (
      <div className="home-container">
        <span> this is my home container</span>
        <Calendar users={this.state.users} reminders={this.state.reminders} />
      </div>
    );
  }
}

export default HomeContainer;

import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  // display flex will out contents beside each other
  display: flex;
  align-items: center;

  // > this will grab the first image of the page, so we can style it
  > img {
    height: 80px;
  }

  button {
    // will ocuppy any available space on the left with
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  //text div (Welcome text)
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    //Welcome color
    span {
      color: #f4ede8;
    }

    // Person's name color
    strong {
      color: #ff9000;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;

  //display flex will make schedule and calendar show beside each other
  display: flex;
`;
export const Schedule = styled.div`
  // Flex 1 will make it occupy all the space available, minus the width of calendar
  flex: 1;
  //margin-left: 120px;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 400;

    span {
      display: flex;
      align-items: center;
    }

    // Will apply to the second span and ahead
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin-left: 8px;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  //Next appointment text (only the first strong text)
  > strong {
    color: #999591;
    height: 20px;
    font-size: 20px;
    font-weight: 400;
  }

  // div that wraps up next appointment information
  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    // To create orange border besides picture
    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0%;
      top: 10%;
      content: '';
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      // this way the clock will be on the left
      margin-left: auto;
      display: flex;
      //align clock image with text
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;
export const Section = styled.section`
  margin-top: 48px;

  // Morning / Afternoon Text sections
  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  // will add margin top to appointments that have other appointment on the top of it
  & + div {
    margin-top: 16px;
  }

  span {
    // this way the clock will be on the left
    margin-left: auto;
    display: flex;
    //align clock image with text
    align-items: center;
    color: #f4ede8;
    width: 70px;
    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 24px;
    color: #fff;
    font-size: 20px;
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

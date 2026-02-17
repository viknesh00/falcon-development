import React, { useState, useEffect, useRef } from 'react';
import Styles from './Styles/DatePicker.module.css';
import { CalendarIcon, CalendarPlusIcon, CalendarArrowIcon } from '../../assets';
import moment from 'moment/moment';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DatePicker = ({ name, value, onChange, setFieldTouched, error, touched, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [view, setView] = useState('days'); // 'days', 'months', 'years'
  const containerRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      const date = moment(value, 'YYYY-MM-DD', true);
      if (date.isValid()) {
        setInputValue(date.format('D MMMM YYYY'));
      }
    } else {
      setInputValue('');
    }
  }, [value]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setView('days');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync viewDate with value when opened
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setViewDate(date);
      }
    }
  }, [value, isOpen]);

  const handleDateSelect = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const formattedDate = `${year}-${month}-${dayStr}`;

    onChange(name, formattedDate);
    if (setFieldTouched) {
      setFieldTouched(name, true);
    }
    setIsOpen(false);
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const changeYear = (offset) => {
    setViewDate(new Date(viewDate.getFullYear() + offset, viewDate.getMonth(), 1));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 0 = Sun, 1 = Mon ... 6 = Sat => We need 0=Mon, 6=Sun
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Previous month filler
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className={`${Styles.dayCell} ${Styles.otherMonth} ${Styles.empty}`}>
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected =
        value &&
        new Date(value).getDate() === d &&
        new Date(value).getMonth() === month &&
        new Date(value).getFullYear() === year;

      days.push(
        <div
          key={d}
          className={`${Styles.dayCell} ${isSelected ? Styles.selected : ''}`}
          onClick={() => handleDateSelect(d)}
        >
          {d}
        </div>
      );
    }

    // Check if we need filler for next month to keep grid consistent (e.g. 35 or 42 cells)
    const totalCells = days.length;
    // We want to fill up to a multiple of 7, usually 35 or 42 depending on start
    const cellsToFill = totalCells > 35 ? 42 - totalCells : 35 - totalCells;

    for (let i = 1; i <= cellsToFill; i++) {
      days.push(
        <div key={`next-${i}`} className={`${Styles.dayCell} ${Styles.otherMonth} ${Styles.empty}`}>
          {i}
        </div>
      );
    }

    return days;
  };

  const renderMonths = () => {
    return MONTHS.map((m, index) => (
      <div
        key={m}
        className={`${Styles.monthCell} ${viewDate.getMonth() === index ? Styles.selected : ''}`}
        onClick={() => {
          setViewDate(new Date(viewDate.getFullYear(), index, 1));
          setView('days');
        }}
      >
        {m}
      </div>
    ));
  };

  const renderYears = () => {
    const currentYear = viewDate.getFullYear();
    const years = [];
    const startYear = currentYear - 6;
    for (let i = 0; i < 12; i++) {
      const y = startYear + i;
      years.push(
        <div
          key={y}
          className={`${Styles.yearCell} ${y === currentYear ? Styles.selected : ''}`}
          onClick={() => {
            setViewDate(new Date(y, viewDate.getMonth(), 1));
            setView('days');
          }}
        >
          {y}
        </div>
      );
    }
    return years;
  };

  const formatDisplayValue = () => {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className={Styles.datePickerContainer} ref={containerRef}>
      <div
        className={`${Styles.inputWrapper} ${isOpen ? Styles.active : ''} ${
          error && touched ? Styles.error : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={Styles.inputLeft}>
          <img src={CalendarIcon} alt="" className={Styles.leftIcon} />
          <input
            type="text"
            value={inputValue}
            placeholder="DD MMMM YYYY"
            className={Styles.dateInput}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);

              const parsedDate = moment(val, 'D MMMM YYYY', true);

              if (parsedDate.isValid()) {
                onChange(name, parsedDate.format('YYYY-MM-DD'));
              }
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className={Styles.rightIcon}>
          <img src={CalendarPlusIcon} alt="" className={Styles.rightIcon} />
        </div>
      </div>

      {isOpen && (
        <div className={Styles.calendarPopup}>
          <div className={Styles.header}>
            <button
              className={Styles.navButton}
              onClick={() => {
                if (view === 'days') changeMonth(-1);
                if (view === 'years') changeYear(-12);
              }}
            >
              {/* Assuming arrow is pointing RIGHT, so rotate for left. */}
              <img
                src={CalendarArrowIcon}
                alt="<"
                className={`${Styles.navIcon} ${Styles.rotate}`}
              />
            </button>
            <div className={Styles.headerTitle}>
              <button className={Styles.selectorButton} onClick={() => setView('months')}>
                {MONTHS[moment(viewDate).month()]}
                <div className={Styles.greenTriangle} />
              </button>
              <button className={Styles.selectorButton} onClick={() => setView('years')}>
                {viewDate.getFullYear()}
                <div className={Styles.greenTriangle} />
              </button>
            </div>
            <button
              className={Styles.navButton}
              onClick={() => {
                if (view === 'days') changeMonth(1);
                if (view === 'years') changeYear(12);
              }}
            >
              <img src={CalendarArrowIcon} alt=">" className={Styles.navIcon} />
            </button>
          </div>

          {view === 'days' && (
            <>
              <div className={Styles.weekDaysGrid}>
                {DAYS.map((d) => (
                  <div key={d} className={Styles.weekDay}>
                    {d}
                  </div>
                ))}
              </div>
              <div className={Styles.daysGrid}>{renderDays()}</div>
            </>
          )}

          {view === 'months' && <div className={Styles.monthsGrid}>{renderMonths()}</div>}
          {view === 'years' && <div className={Styles.yearsGrid}>{renderYears()}</div>}
        </div>
      )}
      {error && touched && <div className={Styles.errorText}>{error}</div>}
    </div>
  );
};

export default DatePicker;

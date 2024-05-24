import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { format as formatDate, isValid, parse } from 'date-fns';

import { IconButton } from '@/elements';
import { Menu } from '@/layers';
import { Card } from '@/layout';
import { Placement } from '@/utils';
import { Calendar, Input, InputProps, InputRef } from '@/form';

import CalendarIcon from '@/assets/icons/calendar.svg?react';

export type DateInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  /**
   * The format in which the date should be displayed.
   * @type {string}
   */
  format?: string;

  /**
   * Calendar placement type.
   */
  placement?: Placement;
} & (
    | {
        isRange?: true;
        value: [Date, Date];
        onChange: (value: [Date, Date]) => void;
      }
    | {
        isRange?: false;
        value: Date;
        onChange: (value: Date) => void;
      }
  );
export const DateInput: FC<DateInputProps> = ({
  disabled,
  value,
  format = 'MM/dd/yyyy',
  placement = 'bottom-start',
  isRange,
  onChange,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<InputRef>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const changeHandler = useCallback(
    (value: Date | [Date, Date]) => {
      if (isRange) {
        onChange(value as [Date, Date]);

        if (value[0] && value[1]) {
          setOpen(false);
        }
      } else {
        setOpen(false);
        // @ts-expect-error because isRange optional
        onChange(value);
      }
    },
    [isRange, onChange]
  );

  const inputChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const dateStr = event.target.value;

      setInputValue(dateStr);

      if (isRange) {
        const [startStr, endStr] = dateStr.split('-');
        const startDate = parse(startStr, format, new Date());
        const endDate = parse(endStr, format, new Date());

        if (
          isValid(startDate) &&
          isValid(endDate) &&
          formatDate(startDate, format) === startStr &&
          formatDate(endDate, format) === endStr
        ) {
          onChange?.([startDate, endDate]);
        }
      } else {
        const date = parse(dateStr, format, new Date());

        if (isValid(date) && formatDate(date, format) === dateStr) {
          // @ts-expect-error because isRange optional
          onChange?.(date);
        }
      }
    },
    [format, isRange, onChange]
  );

  useEffect(() => {
    if (value) {
      if (isRange) {
        const [start, end] = value;
        setInputValue(
          `${start ? formatDate(start, format) : ''}-${end ? formatDate(end, format) : ''}`
        );
      } else if (!isRange) {
        setInputValue(formatDate(value as Date, format));
      }
    }
  }, [format, isRange, value]);

  return (
    <>
      <Input
        ref={ref}
        disabled={disabled}
        endAdornment={
          <IconButton
            className="px-0"
            variant="text"
            onClick={() => setOpen(true)}
          >
            <CalendarIcon />
          </IconButton>
        }
        placeholder={
          isRange
            ? `${format.toUpperCase()} - ${format.toUpperCase()}`
            : format.toUpperCase()
        }
        {...rest}
        value={inputValue}
        onChange={inputChangeHandler}
      />
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        reference={ref?.current?.containerRef}
        placement={placement}
      >
        {() => (
          <Card>
            <Calendar
              disabled={disabled}
              value={value}
              isRange={isRange}
              showDayOfWeek
              onChange={changeHandler}
            />
          </Card>
        )}
      </Menu>
    </>
  );
};

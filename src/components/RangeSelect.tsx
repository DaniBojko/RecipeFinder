import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";

import { colorPalette } from "../assets/StyleVariables";
import { useRef } from "react";
import { Range } from "./FilterDrawer";

interface Props {
  rangeStart: number;
  rangeEnd: number;
  step?: number;
  value: Range;
  onChange: (data: Range) => void;
}

const RangeSelect = ({
  rangeStart,
  rangeEnd,
  step = 1,
  value,
  onChange,
}: Props) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const normalizeNumber = (num: number, step: number) => {
    if (num <= rangeStart) return rangeStart;
    if (num >= rangeEnd) return rangeEnd;

    const tmp = Math.round(num / step);

    return tmp * step;
  };

  const handleSubmit = () => {
    let min = rangeStart;
    let max = rangeEnd;

    if (minRef.current != null)
      min = normalizeNumber(parseInt(minRef.current.value), step);
    if (maxRef.current != null)
      max = normalizeNumber(parseInt(maxRef.current.value), step);

    min = Math.min(min, max);

    if (minRef.current != null) minRef.current.value = min.toString();
    if (maxRef.current != null) maxRef.current.value = max.toString();
    onChange({ rangeStart: min, rangeEnd: max });
  };

  return (
    <>
      <HStack>
        <Input
          name="min"
          border={`2px solid ${colorPalette.secondary}`}
          _hover={{ borderColor: colorPalette.primary }}
          _focusVisible={{
            boxShadow: "0",
            border: `2px solid ${colorPalette.primary}`,
          }}
          ref={minRef}
          type="number"
          defaultValue={value.rangeStart}
        />
        <Input
          name="max"
          border={`2px solid ${colorPalette.secondary}`}
          _hover={{ borderColor: colorPalette.primary }}
          _focusVisible={{
            boxShadow: "0",
            border: `2px solid ${colorPalette.primary}`,
          }}
          ref={maxRef}
          type="number"
          defaultValue={value.rangeEnd}
        />
        <Button
          type="submit"
          width="100px"
          colorScheme="orange"
          onClick={handleSubmit}
        >
          OK
        </Button>
      </HStack>

      <RangeSlider
        aria-label={["min", "max"]}
        min={rangeStart}
        max={rangeEnd}
        value={[value.rangeStart, value.rangeEnd]}
        step={step}
        onChange={(val) => {
          if (val[0] != value.rangeStart || val[1] != value.rangeEnd) {
            if (minRef.current != null)
              minRef.current.value = val[0].toString();
            if (maxRef.current != null)
              maxRef.current.value = val[1].toString();
            onChange({ rangeStart: val[0], rangeEnd: val[1] });
          }
        }}
      >
        <RangeSliderTrack bg={colorPalette.secondaryLight}>
          <RangeSliderFilledTrack bg={colorPalette.secondary} />
        </RangeSliderTrack>
        <RangeSliderThumb zIndex={0} bg={colorPalette.primary} index={0} />
        <RangeSliderThumb zIndex={0} bg={colorPalette.primary} index={1} />
      </RangeSlider>
    </>
  );
};

export default RangeSelect;

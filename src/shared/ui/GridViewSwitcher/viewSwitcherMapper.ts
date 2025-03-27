import { CardView } from '@/shared/types/common';

class ViewSwitcherMapper {
  private static viewValueMap = {
    [CardView.BIG]: 0,
    [CardView.NORMAL]: 1,
    [CardView.SMALL]: 2,
  };
  private static valueViewMap: Record<number, CardView> = {
    0: CardView.BIG,
    1: CardView.NORMAL,
    2: CardView.SMALL,
  };
  valueToView(value: number) {
    if (value > 2) return CardView.SMALL;
    return ViewSwitcherMapper.valueViewMap[value];
  }

  viewToValue(value:CardView) {
    return ViewSwitcherMapper.viewValueMap[value];
  }
}

export const viewSwitcherMapper = new ViewSwitcherMapper();

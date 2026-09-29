import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  ThinkingIcon,
  CodeIcon,
  SparklesIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  GridIcon,
} from './Icons';

describe('Icons', () => {
  const icons = {
    ThinkingIcon,
    CodeIcon,
    SparklesIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    GridIcon,
  };

  it.each(Object.entries(icons))('%s renders an svg element', (_name, Icon) => {
    const { container } = render(<Icon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

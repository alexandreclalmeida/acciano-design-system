import React from 'react';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';
import { LinkButton } from '../LinkButton/LinkButton';
import styles from './ProgressIndicator.module.css';

// ─── _Step (internal primitive) ──────────────────

interface StepProps {
  complete: boolean;
}

const Step: React.FC<StepProps> = ({ complete }) => (
  <div
    aria-hidden="true"
    className={clsx(styles.step, complete ? styles['step--complete'] : styles['step--incomplete'])}
  />
);

// ─── ProgressIndicator ────────────────────────────

export interface ProgressIndicatorProps {
  /** Current step (0 = not started, totalSteps = fully complete). */
  currentStep: number;
  /** Total number of steps. */
  totalSteps: number;
  /** Custom label. Defaults to "Step {currentStep} of {totalSteps}". */
  label?: string;
  /** Called when Back is clicked. Back button is disabled when currentStep is 0. */
  onBack?: () => void;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  label,
  onBack,
  className,
}) => {
  const displayLabel = label ?? `Step ${currentStep} of ${totalSteps}`;
  const isBackDisabled = currentStep === 0;

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.labelAndSteps}>
        <p className={styles.label}>{displayLabel}</p>
        <div className={styles.steps} role="presentation">
          {Array.from({ length: totalSteps }, (_, i) => (
            <Step key={i} complete={i < currentStep} />
          ))}
        </div>
      </div>
      <LinkButton
        tone="link"
        size="small"
        weight="bold"
        underline={false}
        leadingIcon={ArrowLeft}
        disabled={isBackDisabled}
        onClick={onBack}
        className={styles.backLink}
      >
        Back
      </LinkButton>
    </div>
  );
};

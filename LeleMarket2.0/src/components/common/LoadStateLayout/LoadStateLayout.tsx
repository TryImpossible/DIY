import React from 'react';
import { View } from 'react-native';
import EmptyView, { EmptyViewProps } from '../EmptyView';
import LoadingView, { LoaderProps as LoadingProps } from '../LoadingView';
import FailureView, { FailureViewProps } from '../FailureView';
import NoNetworkView, { NoNetworkViewProps } from '../NoNetworkView';

export interface LoadStateLayoutProps {
  state?: 'empty' | 'loading' | 'failure' | 'noNetwork';
  emptyProps?: EmptyViewProps;
  empty?: React.ReactNode;
  loadingProps?: Omit<LoadingProps, 'visible'>;
  loading?: React.ReactNode;
  failurePorps?: FailureViewProps;
  failure?: React.ReactNode;
  noNetworkProps?: NoNetworkViewProps;
  noNetwork?: React.ReactNode;
}

const LoadStateLayout: React.FC<LoadStateLayoutProps> = ({
  children,
  state,
  emptyProps,
  empty,
  loadingProps,
  loading,
  failurePorps,
  failure,
  noNetworkProps,
  noNetwork,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'flex-end' }}>
      {children}
      {state === 'empty' && (empty || <EmptyView {...emptyProps} />)}
      {state === 'loading' && (loading || <LoadingView visible {...loadingProps} />)}
      {state === 'failure' && (failure || <FailureView {...failurePorps} />)}
      {state === 'noNetwork' && (noNetwork || <NoNetworkView {...noNetworkProps} />)}
    </View>
  );
};

export default LoadStateLayout;

import React from 'react';
import { ViewableAccountsList } from '../components/ViewableAccounts/ViewableAccountsList';
import { MonitoringAccountList } from '../components/MonitoringAccounts/MonitoringAccountList';
import { EngageWallet } from '../containers/EngageWalletContainer/loadable';
import { NewProposalContainer } from '../containers/NewProposalContainer/loadable';
import { useAuthContext } from '../containers/AuthContainer';

export function Homepage() {
  const { wallet } = useAuthContext();
  return (
    <>
      <div className="container pt-4 text-right">
        <EngageWallet />
      </div>
      <div className="container pt-28">
        <h1 className="mb-16">Viewing & Monitoring Panel</h1>
        {wallet?.connected && <NewProposalContainer />}
        <ViewableAccountsList />
        <MonitoringAccountList />
      </div>
    </>
  );
}

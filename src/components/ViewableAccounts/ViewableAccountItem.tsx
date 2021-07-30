import React, { useCallback, useState } from 'react';
import { Identicon } from '../Identicon';
import { LinkToExplorer } from '../LinkToExplorer';
import type { ViewableAccount } from './types';
import { AssetLogo } from '../AssetLogo';
import { Toggler } from './Toggler';

interface Props {
  item: ViewableAccount;
}

export function ViewableWallet({ item }: Props) {

  const [expanded, setExpanded] = useState(false);
  const handleToggle = useCallback(() => {
    setExpanded(prevState => !prevState);
  }, []);

  return (
    <div className="py-2 px-4 bg-light bg-opacity-5 rounded-lg mb-8 w-full" key={item.id}>
      <div className="flex flex-row justify-start items-center space-x-4">
        <div className="lg:w-24 flex-shrink-0"><Identicon value={item.address} /></div>
        <div className="w-full lg:w-48 lg:flex-shrink-0 truncate">{item.name}</div>
        <div className="hidden lg:block lg:flex-grow truncate"><LinkToExplorer value={item.address} chainId={item.chainId}/></div>
        <div className="lg:w-24 lg:flex-shrink-0 flex justify-end items-center">
          {item.status === 'pending_for_approval' && <span className="text-light text-opacity-50">Pending</span>}
          {['confirmed', 'pending_for_removal'].includes(item.status) && <Toggler isOpen={expanded} onClick={handleToggle} />}
        </div>
      </div>
      {expanded && (
        <div className="mt-8 pl-2 lg:pl-24 max-h-56 overflow-y-auto">
          {item.tokens.length > 0 ? item.tokens.map(token => (
            <div className="w-full flex flex-row justify-start items-center space-x-4 mb-4">
              <div className="w-2/5 lg:w-36 flex-shrink-0 flex flex-row justify-start items-center space-x-4"><AssetLogo address={'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'} /> <span>{token.name}</span></div>
              <div className="w-3/5 lg:w-48 truncate">{token.balance}</div>
              <div className="hidden lg:block truncate"><LinkToExplorer value={token.address} chainId={item.chainId}/></div>
            </div>
          )) : <p>Account has no balances</p>}
        </div>
      )}
    </div>
  )
}
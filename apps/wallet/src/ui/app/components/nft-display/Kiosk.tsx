// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { getKioskIdFromOwnerCap, hasDisplayData, useGetKioskContents } from '@mysten/core';
import { getObjectDisplay, type SuiObjectResponse } from '@mysten/sui.js';
import cl from 'classnames';

import { NftImage, type NftImageProps } from './NftImage';
import { useActiveAddress } from '../../hooks';
import { Text } from '../../shared/text';

type KioskProps = {
	object: SuiObjectResponse;
	orientation?: 'vertical' | 'horizontal' | null;
} & Partial<NftImageProps>;

// used to prevent the top image from overflowing the bottom of the container
// (clip-path is used instead of overflow-hidden as it can be animated)
const clipPath = '[clip-path:inset(0_0_7px_0_round_12px)] group-hover:[clip-path:inset(0_0_0_0)]';

const timing = 'transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]';
const cardStyles = [
	`scale-100 group-hover:scale-95 object-cover origin-bottom z-30 group-hover:translate-y-0 translate-y-2 group-hover:shadow-md`,
	`scale-[0.95] group-hover:-rotate-6 group-hover:-translate-x-5 group-hover:-translate-y-2 z-20 translate-y-0 group-hover:shadow-md`,
	`scale-[0.90] group-hover:rotate-6 group-hover:translate-x-5 group-hover:-translate-y-2 z-10 -translate-y-2 group-hover:shadow-xl`,
];

export function Kiosk({ object, orientation, ...nftImageProps }: KioskProps) {
	const address = useActiveAddress();
	const { data: kioskData, isLoading } = useGetKioskContents(address);

	const kioskId = getKioskIdFromOwnerCap(object);
	const kiosk = kioskData?.kiosks.get(kioskId!);
	const itemsWithDisplay = kiosk?.items.filter((item) => hasDisplayData(item)) ?? [];

	const showCardStackAnimation = itemsWithDisplay.length > 1 && orientation !== 'horizontal';
	const imagesToDisplay = orientation !== 'horizontal' ? 3 : 1;
	const items = kiosk?.items.slice(0, imagesToDisplay) ?? [];

	if (isLoading) return null;

	return (
		<div className="relative hover:bg-transparent group rounded-xl transform-gpu overflow-visible w-36 h-36">
			<div className="absolute z-0">
				{itemsWithDisplay.length === 0 ? (
					<NftImage animateHover src={null} name="Kiosk" {...nftImageProps} />
				) : (
					items.map((item, idx) => {
						const display = getObjectDisplay(item)?.data;
						return (
							<div
								key={item.data?.objectId}
								className={cl(
									'absolute rounded-xl border',
									timing,
									showCardStackAnimation ? cardStyles[idx] : '',
								)}
							>
								<div className={`${idx === 0 && showCardStackAnimation ? clipPath : ''} ${timing}`}>
									<NftImage
										{...nftImageProps}
										src={display?.image_url!}
										animateHover={items.length <= 1}
										name="Kiosk"
									/>
								</div>
							</div>
						);
					})
				)}
			</div>
			{orientation !== 'horizontal' && (
				<div
					className={cl(
						timing,
						'right-1.5 bottom-1.5 flex items-center justify-center absolute h-6 w-6 bg-gray-100 text-white rounded-md',
						{ 'group-hover:-translate-x-0.5 group-hover:scale-95': showCardStackAnimation },
					)}
				>
					<Text variant="subtitle" weight="medium">
						{items?.length}
					</Text>
				</div>
			)}
		</div>
	);
}

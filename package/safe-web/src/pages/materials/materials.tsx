import React from 'react';
import { useTranslate } from '@tolgee/react';

import PageContainer from '../../page-components/page-container/page-container';
import PrimaryContainer from '../../components/primary-container/primary-container';
import MaterialsCard from '../../components/materials-card/materials-card';

import { useDeviceType } from '../../helpers/responsiveContainers';

import styles from "./materials.module.scss";
import commonStyles from "../../styles/common.module.scss";
import containersStyles from "../../styles/containers.module.scss";
import landingPageStyles from "../landing-page/landing-page.module.scss";

import ImgTop from "../../assets/handbooks/teachers_page1.svg";
import FakeNews from '../../assets/courses/fake_news.svg';
import Cyberbullying from '../../assets/courses/cyberbullying.svg';
import InternetScam from '../../assets/courses/internet_scam.svg';
import OnlineThreats1 from '../../assets/courses/online_threats1.svg';
import OnlineThreats2 from '../../assets/courses/online_threats2.svg';
import WebSecurely from '../../assets/courses/web_securely.svg';
import HistoryCybersecurity from '../../assets/courses/history_cybersecurity.svg';

type TMaterial = {img: string, name: string};
const materials: TMaterial[] = [
	{
		img: FakeNews,
		name: "fake-news"
	},
	{
		img: Cyberbullying,
		name: "cyberbullying"
	},
	{
		img: InternetScam,
		name: "internet-scam"
	},
	{
		img: OnlineThreats1,
		name: "online-threats1",
	},
	{
		img: OnlineThreats2,
		name: "online-threats2"
	},
	{
		img: WebSecurely,
		name: "web-securely",
	},
	{
		img: HistoryCybersecurity,
		name: "history-cybersecurity"
	}
];

const Materials: React.FC = () => {
	const { t } = useTranslate();
	const { isMobile } = useDeviceType();

	const prepareRows = (arr: TMaterial[]): TMaterial[][] => {
		if (isMobile) return arr.map(item => [item]);
		const temp: TMaterial[][] = [];
		let temp2: TMaterial[] = [];
		
		for (let i = 0; i < arr.length; i++) {
			if (i % 3 === 0 && i > 0) {
				temp.push([...temp2]);
				temp2 = [];
			} 
			temp2.push(arr[i]);
		}

		return temp;

	}
 
	return (
		<PageContainer>
			<PrimaryContainer direction="column" additionalClassess={commonStyles.smallVerticalPadding}>
				<PrimaryContainer
				direction={isMobile ? "column" : "rowReverse"}
				additionalClassess={`${containersStyles.pagePadding}`}
				width="desktopFit"
				contentJustify={isMobile ? "center" : "right"}
			>
				<PrimaryContainer additionalClassess={!isMobile ? containersStyles.halfScreenContainer : ""}>
					<img alt="For teachers" src={ImgTop} className={landingPageStyles.landingPageImg} />
				</PrimaryContainer>
				<PrimaryContainer direction="column" contentJustify="left" contentAlignment="left" additionalClassess={!isMobile ? `${containersStyles.halfScreenContainer}` : ""} >
					<p className={`${commonStyles.basicHeader2} ${commonStyles.noPadding}`}>
						{t("manuals.header")}
					</p>
					<p className={`${commonStyles.basicText}`}>
						{"Lorem ipsum dolor sit amet consectetur. Molestie mauris integer amet fringilla proin ac. A est quis quis aliquet et placerat nulla. Fermentum mi semper gravida ultrices risus. Porttitor id elementum enim elit lobortis in neque viverra. Dolor eget viverra velit scelerisque vulputate.Lorem ipsum dolor sit amet consectetur. Molestie mauris integer amet fringilla proin ac. A est quis quis aliquet et placerat nulla. Fermentum mi semper gravida ultrices risus. Porttitor id elementum enim elit lobortis in neque viverra. Dolor eget viverra velit scelerisque vulputate."}
					</p>
				</PrimaryContainer>
			</PrimaryContainer>
			<PrimaryContainer direction="column" additionalClassess={styles.materialsContainer} width="desktopFit">
				<PrimaryContainer direction="column" additionalClassess={commonStyles.basicGap}>
					{
						prepareRows(materials).map((row, index) => (<PrimaryContainer direction="row" key={`manuals-row-${index}`} additionalClassess={commonStyles.basicGap}>
							{
								row.map((item, index2) => (
									 <MaterialsCard 
										key={`card-${(index * 3) + index2 + 1}`}
										header={t(`landing-page.carousel.${item.name}`)}
										description={t(`landing-page.carousel.${item.name}.description`)}
										picture={item.img}
									/>
								))
							}
						</PrimaryContainer>))
					}
				</PrimaryContainer>
			</PrimaryContainer> 
			</PrimaryContainer>
			
		</PageContainer>
	);
};
 
export default Materials;
 
/**
 * External dependencies
 */
import { FacebookIcon, FormIcon, TwitterIcon } from '@godaddy-wordpress/coblocks-icons';
import Confetti from 'react-dom-confetti';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	Button,
	Icon,
} from '@wordpress/components';
import { SVG, G, Path } from '@wordpress/primitives';
import { verse } from '@wordpress/icons';

const confettisConfig = {
	angle: 90,
	spread: 360,
	startVelocity: 30,
	elementCount: 70,
	dragFriction: 0.1,
	duration: 6000,
	stagger: 5,
	width: '8px',
	height: '8px',
	perspective: '500px',
	colors: [ '#1976D2', '#E20087', '#FED317', '#EF6C0F', '#744BC4' ],
};

const SuccessView = ( props ) => {
	return (
		<div className="publish-guide-popover__success publish-guide-success">
			<div className="publish-guide-success__content">
				<SVG fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 126" className="publish-guide-success__svg"><G fill="#111"><Path d="M85.5789 32.4279c-.08-.1664-.1909-.4682-.2525-.616-.0616-.1479-.0863-.3388-.1294-.5113s-.1232-.499-.2094-.7454-.1971-.5605-.3019-.8439c-.1047-.2834-.1971-.5421-.2833-.8193s-.2033-.616-.2957-.9609c-.0924-.345-.1355-.4805-.2094-.7208-.1171-.3572-.2464-.7145-.3758-1.0718l-.2217-.616c-.0801-.2279-.1541-.462-.2341-.6961-.1048-.3388-.2156-.6714-.3388-1.0041l-.3327-.9178-.3757-1.0226c-.1725-.4743-.345-.9424-.5113-1.4168-.0739-.2156-.154-.4312-.2341-.6529-.1232-.3388-.2526-.6776-.3634-1.0226-.1602-.4928-.3142-.9794-.4805-1.4661-.0801-.2279-.1478-.4558-.2156-.6837s-.1602-.5236-.2464-.7823c-.0863-.2588-.1848-.4928-.2834-.7392-.0985-.2464-.1909-.4559-.271-.6961-.0801-.2403-.154-.4867-.2279-.7392-.074-.2526-.1479-.4805-.228-.7207l-.1232-.3758c-.1232-.3573-.2464-.7146-.3634-1.078-.0616-.1848-.1293-.3758-.1909-.5667-.0986-.2895-.1972-.5852-.2896-.8809-.1417-.462-.3018-.89936-.4681-1.34288l-.2772-.69608-.2403-.616c-.1601-.41888-.3018-.85624-.4496-1.30592 0-.04928-.0617-.24024-.1356-.50512s-.1601-.616-.2525-.924c-.4066-1.45992-.5236-1.57696-.7146-1.66936-.0571-.02567-.1191-.03894-.1817-.03894-.0627 0-.1246.01327-.1817.03894-.0845.0342-.1558.09467-.2033.17248-.2342.16647-.4768.32067-.7269.462l-.308.1848-.7761.54208c-.3265.23408-.653.462-.9857.6776-.08.04928-.2094.11704-.3634.19096-.6961.3388-1.232.616-1.3614 1.078-.1293.462.4251 1.9712.4312 1.98352.1239.30892.2679.60936.4313.89936.1416.26488.2771.51744.388.78232.1109.26484.2033.56674.308.86854.0616.191.1232.3819.191.5729.1725.4805.3388.9671.499 1.4538l.2032.616c.0986.2895.1971.5728.2834.8562.0862.2834.1478.499.2156.7454s.1355.4989.2156.7392l.1109.3819c.117.3696.2279.733.3449 1.0965.1171.3634.2095.616.3204.9363.0677.1786.1293.3573.1909.5359s.1725.5051.2526.7638c.08.2588.1601.4928.2464.7392l1.0287 2.9137c.0862.2587.1848.5113.2834.7639.0985.2525.1909.4804.271.7207.0801.2402.1909.5359.2833.8069l.2403.69c.0862.2402.1601.4804.2341.7207.0739.2402.1601.5297.2525.7885.1725.4989.3819.9856.5852 1.4476l.1971.4743.7331 1.8911c.076.2138.1176.4384.1232.6653.0093.176.032.351.0677.5236.0354.1704.1092.3305.2157.4681.0127.0251.0293.048.0492.0678-.0273.0567-.0414.1188-.0414.1817s.0141.125.0414.1817c.0298.0548.0712.1024.1211.1396.05.0372.1075.0632.1685.076.1845.0368.3723.0553.5605.0555.4157-.0077.8292-.0635 1.232-.1663l.5667-.1602c.3048-.1008.6182-.173.9363-.2156h.7085c.4976.005.9951-.0155 1.4907-.0616.0822.0016.1632-.0198.234-.0616.0788-.0345.1408-.0987.1725-.1786.0308-.0489.0508-.1037.0587-.1609.0079-.0571.0036-.1153-.0127-.1707-.0164-.0554-.0443-.1066-.0819-.1503-.0377-.0438-.0842-.079-.1366-.1033zM35.4611 38.4277c.0005-.1525-.0098-.3048-.0308-.4559-.0799-.2953-.198-.579-.3511-.8439-.1038-.1838-.1884-.3779-.2526-.579-.0677-.2403-.1232-.4867-.1786-.7331s-.0924-.4188-.1417-.616c-.1204-.4804-.2854-.9485-.4928-1.3983-.1166-.2887-.2133-.5851-.2895-.887-.0678-.2649-.1478-.5421-.2341-.807-.2279-.6837-.616-1.4907-1.3305-1.6817-.1643-.062-.3422-.0793-.5153-.05-.1732.0292-.3355.1039-.4703.2164-.1503.1998-.25.433-.2908.6797-.0407.2466-.0213.4995.0567.7371.0672.3581.1556.7119.2649 1.0595.0616.2341.1232.4558.1478.616.1229.6257.3565 1.2244.6899 1.7679.2215.4201.3635.8774.4189 1.349l.037.1787c.1305.5832.3376 1.1466.616 1.6755l.0739.1417c.0649.1672.1708.3155.308.4312.0002.0741.0176.1471.0507.2133.0331.0663.0811.124.1402.1686.0919.0669.1938.1189.3019.154h.0554c.1829.1238.3956.1961.616.2094.0593.0087.1194.0087.1787 0 .3264-.0862.4804-.3572.616-.616.0351-.062.0535-.132.0535-.2032 0-.0713-.0184-.1413-.0535-.2033.0246-.1602.0123-.3881.0061-.5236zM103.744 6.6915c-.054-.10525-.138-.1926-.241-.25159-.102-.059-.22-.08714-.338-.08105-.35.03485-.697.10082-1.035.19712-.147.0528-.28.13928-.388.25256-.511.4666-1.129.80079-1.7989.97328-.3086.0663-.5924.21783-.8193.43736-.198.19255-.4298.34706-.6837.45584-.1877.08179-.3605.1942-.5113.33264-.3437.33581-.7679.57763-1.232.70224-.5924.21633-1.1443.5308-1.6324.9302-.1751.1519-.3879.2541-.616.2956-.2089.0372-.4019.1359-.5544.2834-.1541.1407-.3212.2665-.4989.3758-.382.234-.7824.462-1.2321.7022l-.1108.0616c-.1717.1104-.3584.1955-.5544.2526-.4074.1048-.7918.2844-1.1335.5297-.1047.0678-.2279.1355-.3388.1971-.1664.0846-.3251.1835-.4743.2957-.4267.3807-.9281.6681-1.4722.8439-.137.0427-.256.1293-.3388.2464-.1178.1801-.1624.3984-.1246.6102s.1551.4012.3279.5294c.1755.1401.3915.22.616.228h.0985c.0895-.0101.1761-.0381.2545-.0826.0783-.0445.1469-.1044.2014-.1762.1663-.2079.4072-.3427.6714-.3757.1301-.0303.2533-.0846.3634-.1602l.1232-.0677.1787-.0986c.1016-.0631.2088-.1168.3203-.1602.3668-.1045.7084-.2827 1.0041-.5236.1701-.1466.3666-.2595.579-.3326.2083-.0737.4037-.1797.579-.3142.3591-.2892.7655-.5143 1.2012-.6652.2395-.0808.4673-.1926.6777-.3327.2147-.14.4466-.2518.6899-.3326.1852-.0552.36-.1405.5174-.2526.1619-.1129.3306-.2158.5051-.308.294-.1475.564-.3385.8008-.5667.0287-.0237.0624-.0405.0986-.0493l.1601-.0369 1.3922-.7516c.0438-.0241.0834-.0553.117-.0924.3549-.3018.7776-.51319 1.232-.61596.261-.06722.502-.19609.702-.37576.173-.16118.368-.2961.579-.4004l.16-.07392c.249-.09364.481-.22905.684-.4004.068-.05534.148-.09338.234-.11088.23-.04961.444-.15553.622-.30822.179-.15269.316-.34736.401-.5665.008-.0197.018-.03833.031-.05544.079-.12039.122-.26131.123-.40565.002-.14434-.039-.2859-.117-.40747zM88.0483 5.76131c.0397-.28898.1405-.56619.2957-.81312.2867-.45462.4658-.9687.5236-1.50304.0103-.14477.0569-.28461.1356-.40656.1692-.24891.2788-.53348.3203-.8316.0294-.1609.0706-.31942.1232-.47432l.0739-.25257v-.07391c.0347-.09036.0514-.18661.0493-.28337-.003-.131088-.0508-.257201-.1356-.357275-.0792-.081415-.1756-.144122-.2822-.183551s-.2206-.054586-.3337-.044368c-.1232.008464-.2428.045075-.3496.107015-.1068.061941-.1979.147559-.2665.250265-.0364.051104-.0693.104613-.0985.160164-.0401.07688-.0854.15097-.1355.22175-.2638.36962-.4502.78865-.5483 1.23201-.0834.44583-.2666.86702-.5359 1.23199-.2215.29438-.3884.62612-.4928.97945-.0924.27104-.1971.53592-.3018.78848-.0432.09856-.0986.19712-.1479.30184-.0875.16419-.1617.33517-.2217.51128-.074.2464-.1356.49896-.191.74536s-.0924.4004-.1478.616c-.0504.20607-.1358.40195-.2526.57904-.2124.34715-.3391.7399-.3696 1.14576v.14168c-.0029.16518.0515.32626.154.45579.0723.1085.1703.1973.2854.2586.115.0613.2434.0931.3737.0926.1091-.001.2173-.0197.3203-.0555.1746-.0603.3303-.1655.4514-.30496.121-.13948.2033-.30834.2386-.48965 0-.03696 0-.07392.0308-.11088.0094-.08099.0367-.15885.08-.22792.245-.33275.419-.71223.5113-1.11496.0163-.0588.0412-.11485.074-.16632.16-.26094.2413-.56254.234-.86856-.0029-.09992.0153-.19933.0535-.2917.0383-.09237.0956-.1756.1683-.24422.099-.09215.178-.20369.232-.32768.0541-.12399.082-.25778.0821-.39304zM100.368 20.3112l-.093-.1294-.037-.0554c-.059-.1054-.14-.1968-.2381-.268-.0978-.0712-.2098-.1206-.3283-.1447h-.1355c-.4112-.0995-.8435-.0627-1.232.1047-.1487.077-.3127.1198-.4801.1251-.1673.0053-.3338-.0269-.487-.0943-.1632-.0537-.3334-.0828-.5051-.0862-.2286.0013-.4569.0157-.6838.0431h-.0308c-.1515.0094-.3009.0405-.4435.0924-.1187.0626-.2509.0953-.385.0953-.1342 0-.2663-.0327-.385-.0953-.1113-.0681-.2392-.1041-.3696-.1041-.1305 0-.2584.036-.3696.1041-.1244.0746-.265.1181-.4098.1267s-.2895-.018-.4218-.0774c-.1782-.0505-.3631-.0734-.5483-.0678h-.425c-.1294 0-.2587 0-.3758 0-.1719-.0144-.3441.0239-.4937.1097s-.2696.2151-.344.3708c-.0544.1831-.0655.3764-.0324.5646.0332.1881.1096.366.2233.5195.057.0522.1241.0921.1972.1171h.0677c.3311.1113.6851.1367 1.0287.0739.1584-.029.3197-.0394.4805-.0308h1.8172c.165-.0002.3297.0122.4928.037.1021.0377.2072.0665.3142.0862.1173.0022.2342-.0166.3449-.0554.3477-.1124.7163-.144 1.078-.0924.1317.0307.2687.0307.4004 0 .3893-.0764.7914-.0553 1.1704.0616.2621.0722.5387.0738.8016.0046.2629-.0693.5033-.2069.6953-.3989.133-.1088.22-.2636.244-.4336.024-.1701-.017-.3429-.115-.4842zM28.414 103.656c-.271-.055-.5421.302-.616.413-.1848.265-.3203.616-.2033.813.0064.011.0152.021.0259.029.0106.007.0229.012.0357.014h.0493s.961-.727.8932-1.084c-.0081-.046-.0302-.089-.0633-.122-.033-.033-.0755-.055-.1215-.063z" /><Path d="m86.2628 30.5927c.1924.5474.38 1.0806.6028 1.7552l.0801.3018c.1091.2247.1878.4629.2341.7084-.0863.7823-.9487.8871-1.4107.9425l-.7577.0801c-.2895.0308-.5975.0554-.8685.0924-.2711.0369-.5421.0554-.8131.0739-.2711.0185-.5483.0677-.8193.0677-.2642.0436-.5255.1032-.7824.1787-.2714.0755-.547.1351-.8254.1786-.2808.0247-.5631.0247-.8439 0-.2684-.0246-.5385-.0246-.807 0l-.8809.0801-.7515.0616c-.3017.047-.5986.1212-.887.2218-.2819.1012-.5727.1755-.8686.2217-.3013.0247-.6041.0247-.9055 0-.2991-.0277-.6002-.0277-.8993 0-.2907.0483-.5786.112-.8624.191-.296.0823-.5962.1481-.8994.1971-.5914.0801-1.1643.1663-1.7802.2403-.462.0554-.9364.1047-1.3984.1478l-.3942.0369c-.3881.037-.7823.0863-1.1642.1417l-.3512.0493c-.2648.037-.5913.0986-.8809.154l-.6159.1232c-.2468.0368-.4959.0554-.7454.0555-.2641-.0012-.5278.0194-.7885.0616-.2611.06-.5183.1361-.77.2279-.2299.0848-.4643.1567-.7022.2156-.2711.0677-.5852.1601-.8008.234-.2156.074-.4374.1479-.6653.2033-.2486.0595-.5023.0945-.7577.1047-.2617.0119-.5216.0491-.7761.1109-.7075.1724-1.4342.2531-2.1622.2403h-.6406c-.333.0275-.668.0151-.998-.037-.393-.0718-.7958-.0718-1.1888 0-.2869.047-.5708.1107-.8501.191-.3487.0999-.7052.1699-1.0657.2094h-.1478c-.3828.0432-.7692.0432-1.152 0-.4098-.0366-.8221-.0366-1.232 0-.3963.0377-.7895.1035-1.1765.1971-.1787.037-.3635.0801-.5483.1109-.3049.0103-.6102-.0083-.9116-.0554-.2269-.0301-.4551-.0486-.6838-.0555-.2546.364-.4077.7893-.4435 1.232-.0555.2649-.1232.5791-.1725.7762s-.1232.3819-.1232.5297c-.0632.3122-.1434.6206-.2402.924-.074.2341-.1294.4374-.2033.7392-.0739.3019-.1294.616-.1787.9179-.0761.4715-.179.9384-.308 1.3983-.1098.3604-.2003.7264-.271 1.0965-.0678.2957-.1355.6098-.2156.9117l-.0431.1478c-.1575.6266-.3508 1.2436-.5791 1.848-.1153.2686-.2469.5299-.3942.7823-.1669.2732-.3111.5596-.4312.8563-.0987.2944-.1688.5976-.2094.9055-.0457.3009-.1158.5975-.2095.887-.1088.2904-.2343.5742-.3757.8501-.1351.2688-.2565.5443-.3635.8254-.1417.4312-.2895.8316-.4373 1.232l-.191.5113-.1848.5421c-.1233.4096-.2777.8091-.462 1.195-.2649.5729-.5914 1.1212-.8809 1.6263-.3167.5509-.6904 1.0671-1.1149 1.54-.4171.5089-1.0113.8412-1.6632.9301-.1498-.0089-.3-.0089-.4497 0-.2762.0339-.5555.0339-.8316 0-.2927-.0644-.5733-.1746-.8316-.3264l-.3511-.1725c-.3031-.1284-.6163-.2314-.9364-.308l-.1416-.0308-.0232-.005c-.2182-.0472-.4098-.0887-.636-.1244-.5301-.0974-1.0469-.2566-1.54-.4743-.7145-.3388-1.1272-.6406-1.232-.9548-.1118.2146-.1967.4422-.2525.6776-.1161.2204-.2566.427-.4189.616-.1989.2165-.3575.4668-.4682.7392-.0032.0492-.0032.0986 0 .1478.0227.0053.0438.0159.0616.0308.0287.0257.0517.057.0676.092s.0244.0729.0248.1113c.0381.4713.1812.928.4189 1.3367l.2834.5175c.117.2094.2279.4189.3511.616.0862.1371.1809.2688.2834.3942.1771.2167.33.4522.4558.7023.1952.4433.4303.868.7022 1.2689.1729.2996.2996.6236.3758.961.0545.2095.1224.4152.2033.616.1383.2828.3077.5493.5051.7946.1488.1963.2846.4021.4066.616l.2032.3635c.2033.3572.4066.7145.616 1.078.1258.2172.2516.4928.3478.7037l.0218.0478c.0986.2156.1972.425.2957.616.1613.3223.2992.6558.4127.9979.1344.4336.3249.8478.5668 1.232.1886.2214.3946.4273.616.616.2182.192.4239.3978.616.616.1706.193.3582.3703.5605.5298.2126.161.4049.3472.5729.5544.1122.1906.1914.3989.2341.616.0473.2549.1646.4916.3388.6837.2753.2869.5267.596.7515.924.1478.1787.308.3943.4866.616.3327.4004.7208.8748 1.0904 1.3614.1785.2433.3333.5032.462.7761.1223.2531.2644.4962.425.7269.345.4312.6406.8624.961 1.2875l.0739.1047c.1905.2447.3962.4772.616.6961.1848.2156.3696.4127.5421.616l.616.8131.2833.3696c.1441.183.2984.3578.462.5236.1787.2033.3635.4004.5236.616l.2895.3881c.2095.2648.4189.542.616.8193.1489.2249.2827.4595.4004.7022.1006.2119.2138.4176.3388.616.1232.1848.228.3265.3943.5421s.3388.4435.4866.6776l.3881.616c.1971.3141.3881.616.579.9301.1649.2805.313.5706.4436.8686.117.2525.271.5667.3757.7577.1047.1909.2218.3757.3327.5667.1971.3265.3942.6653.579 1.0102.2526.4928.5482 1.0595.8008 1.6324.1477.1599.2855.3286.4127.5051.064.2197.1401.4356.2279.6468.1065.2022.2345.3922.382.5668.1598.1873.2944.3943.4004.6163.0985.215.1848.468.2587.659s.1293.357.2464.616c.117.259.2033.493.2957.733l.0157.041c.0866.225.1695.441.2799.673.028.034.0641.059.1047.074.1434.074.2583.193.3265.339.0445.175.0591.356.0432.536-.0077.098-.0077.197 0 .296l.0677.339c.0981.562.2402 1.116.4251 1.657.117.308.2525.609.4004.924.1478.314.2956.64.4188.967.037.086.0986.178.0986.265.1109.283.2218.609.3573.899.0894.171.1946.334.3141.487.1495.186.27.393.3573.616.0901.293.1357.598.1355.905-.001.3.0405.599.1232.887.1048.308.2526.628.3573.875.1047.246.2218.505.3142.758.1122.304.2418.603.3881.893.1108.228.2217.462.3264.714.0538.177.0869.358.0986.542.0489.433.1312.862.2464 1.282.1258.594.3802 1.153.7453 1.638.2957.08.5914.142.9117.203.2218.044.4497.087.6776.142l.6838.142c.2957.055.6037.117.9117.197.3863.112.7666.243 1.1396.394l.4004.148c.5104.193 1.0048.425 1.4784.696l.0739.043.0487.029c.5663.333 1.0806.636 1.1525 1.468.0406.238.0231.482-.0509.711-.074.23-.2023.438-.3741.607-.1602.167-.2095.216-.2896.216-.0843.026-.1621.07-.2279.129-.4105.278-.8643.487-1.3429.616-.4361.117-.8852.179-1.3367.185h-.1971c.0801.037.0801.08.0801.117-.0072.026-.0238.049-.0465.064-.0227.014-.05.02-.0767.016-.1294 0-.1294-.092-.1294-.092.0018-.02.0091-.04.021-.056.012-.016.0281-.029.0468-.037h-.3019c-.3211.036-.644.052-.9671.05-.3449 0-.6283.043-.9609.043l-.4867.031h-1.9773c-.2403-.007-.4805-.043-.7146-.043-.4094-.04-.821-.053-1.232-.037-.673.037-1.3475.037-2.0205 0-.1783.005-.3558.028-.5297.067-.3641.106-.7471.129-1.1212.068-.1063-.002-.2103-.032-.3018-.086-.1851-.165-.335-.366-.4408-.59-.1059-.225-.1654-.468-.1752-.716-.0847-.612-.1032-1.232-.0554-1.848.0369-.275.1137-.542.2279-.795l.0369-.111.0432-.104c.0725-.169.1342-.342.1848-.518l-.0432-.031c-.1416-.086-.2587-.16-.2587-.252-.0953-.712-.3032-1.405-.616-2.051-.1779-.4-.3281-.812-.4497-1.232l-.1416-.456-.1479-.468c-.1355-.395-.271-.82-.4189-1.232-.1629-.396-.3695-.772-.616-1.122-.0924-.147-.1909-.301-.2772-.449-.2146-.41-.3859-.842-.5112-1.288-.0678-.209-.1294-.412-.2033-.616-.2234-.545-.4999-1.067-.8255-1.558l-.1108-.179c-.1892-.347-.3321-.718-.4251-1.102-.0674-.266-.1517-.528-.2525-.783-.1217-.27-.2616-.531-.4189-.782-.1995-.318-.3647-.657-.4928-1.01-.218-.605-.4858-1.19-.8008-1.75-.1417-.258-.2772-.517-.4004-.77-.191-.406-.3819-.782-.616-1.158l-.3696-.616-.5606-.899-.3449-.542c-.2156-.3206-.4128-.6286-.616-.9366-.1538-.2572-.2897-.5248-.4066-.8008-.109-.2714-.2409-.5331-.3942-.7823-.1602-.2464-.3388-.4928-.5052-.7269-.1663-.2341-.3449-.4805-.4989-.7207s-.3203-.4681-.4867-.7146c-.1663-.2464-.3388-.4928-.4989-.7392-.1877-.2664-.3935-.5196-.616-.7576-.154-.1787-.2834-.2896-.4682-.5668-.1848-.2771-.4004-.5543-.616-.8254l-.4065-.5236c-.1774-.2484-.3321-.5123-.462-.7885-.1164-.2434-.2502-.4781-.4004-.7022-.1581-.2075-.34-.3957-.5421-.5606-.1954-.1656-.3748-.3491-.5359-.5482-.1356-.1725-.2156-.2957-.382-.5359-.1663-.2403-.3326-.4805-.5174-.7023-.1731-.2181-.3199-.4559-.4374-.7084-.0973-.2159-.2148-.4222-.3511-.616-.1467-.1846-.3118-.3538-.4928-.5051-.1963-.1626-.374-.3464-.5297-.5482-.0642.4385-.0496.8849.0431 1.3182.0337.2038.0542.4096.0616.616v1.386c.0203.2071.0532.4129.0985.616.0564.2512.0915.5067.1048.7639.0008.5106-.03 1.0208-.0924 1.5276-.0432.1417-.0432.2834-.0432.4251-.0431.425-.0985.8377-.1478 1.232-.0308.234-.0862.4681-.0862.696l-.0555.4005c-.0444.2752-.0711.5529-.0801.8315-.0177.345-.0567.6886-.117 1.0288v.2156c-.034.2326-.0525.4672-.0554.7022-.0105.289-.0393.5771-.0863.8624-.0369.1725-.0862.3511-.0862.5236-.0401.3514-.1144.698-.2218 1.0349-.13.3546-.2908.6966-.4805 1.0226-.1293.24-.2587.48-.3634.727-.2218.523-.4928 1.022-.7515 1.509l-.1171.216c-.1108.215-.2156.449-.3203.671-.1556.367-.3389.721-.5482 1.06l-.0863.135c-.234.351-.4681.715-.7515 1.066l-.1786.228c-.2403.289-.4867.622-.7454.905-.1992.204-.4203.386-.6591.542-.1731.113-.336.241-.4866.382-.2095.21-.4004.475-.616.666-.2156.19-.4251.425-.616.616-.191.19-.3327.338-.5544.572-.2218.234-.4497.475-.69.709-.2402.234-.5359.493-.7576.653-.2218.16-.4251.326-.616.499l-.499.449c-.2218.179-.425.352-.616.536l-.4435.401-.616.585c-.176.178-.3425.365-.499.56-.1464.191-.3048.372-.4743.543-.1786.178-.345.375-.5113.572-.1439.184-.2981.358-.462.524-.0558.059-.1155.115-.1786.166-.2279.197-.6468.567-1.0842 1.017-.1725.197-.3511.406-.5236.616-.1923.245-.3979.479-.616.702-.359.36-.744.694-1.1519.998.3326.049.6653.123 1.0102.191l.4066.086c.2341.043.4805.093.7146.093.3478.018.6927.074 1.0287.166.4748.16.9328.366 1.3675.616l.2279.123c.238.109.4411.282.5868.499.1457.218.2283.471.2387.733.0908.523-.0288 1.061-.3327 1.497-.327.437-.748.795-1.232 1.047-.6004.248-1.2369.398-1.8849.444-.3573.043-.7269.043-1.0904.043h-2.6796c-.2377-.013-.4744-.042-.7084-.086-.2558-.051-.5155-.08-.7761-.087-.2526.006-.5113.043-.7515.068-.2403.025-.4928.062-.7392.062-.2701.003-.54-.015-.807-.056-.2288-.031-.45913-.049-.68993-.055-.21839.004-.43638.021-.65296.049-.2733.039-.54955.054-.82544.043-.27617.061-.56456.036-.82544-.074-.00793.013-.01879.023-.03166.031-.01288.007-.02737.012-.04226.012-.02668-.002-.05193-.013-.07194-.03-.02-.018-.03367-.042-.03894-.068v-.043c-.14226-.093-.27082-.205-.38192-.333-.31017-.392-.47359-.88-.462-1.38-.04312-.154-.04312-.308-.04312-.468-.0563-.346-.06665-.698-.0308-1.047.0886-.437.25556-.855.4928-1.232.04928-.086.06776-.13.14168-.265.07392-.136.14168-.277.20944-.425.1515-.351.34158-.683.56672-.992.19965-.23.42492-.437.67144-.616.18426-.145.35914-.301.5236-.468.20328-.222.41888-.487.57288-.678l.03436-.042c.14169-.176.27851-.346.41532-.5.36347-.406.72687-.819 1.08417-1.232.1848-.209.3634-.468.5174-.659s.3142-.413.4928-.616l.4497-.517.616-.721c.1787-.216.3573-.474.5113-.665s.3142-.407.4866-.616c.1805-.207.3739-.403.5791-.585.2066-.179.4001-.373.579-.579.1787-.222.3573-.45.5298-.678l.4805-.616.4866-.585c.1848-.228.3819-.462.5544-.678.1725-.215.3203-.45.4682-.677.1426-.235.2989-.462.4681-.678.1477-.197.302-.388.4559-.579l.5667-.702c.1683-.206.3408-.411.5174-.616l.5236-.616c.1892-.233.3951-.451.616-.653.2179-.193.4237-.398.616-.616.2034-.27.3866-.554.5483-.85.117-.198.2402-.413.3757-.616l.1232-.179c.2951-.41.5607-.84.7947-1.2875.2367-.5245.4204-1.0713.5482-1.6324l.0678-.2649c.1108-.4127.2217-.8439.2956-1.2689.0986-.5976.1602-1.0965.2033-1.5585v-.2957c.037-.425.0924-.8562.0924-1.2813.0062-.2341.0493-.4743.0493-.7084.0338-.2904.0523-.5824.0554-.8747v-1.5831c-.0221-.3561-.0695-.7101-.1416-1.0595-.037-.191-.1048-.4066-.1048-.616-.0739-.5544-.1663-1.115-.2833-1.6694v-.0493c-.1109-.5297-.2218-1.0718-.3573-1.6077-.0739-.2649-.1725-.6345-.2464-.8809s-.1478-.499-.2156-.7515c-.0924-.3512-.1725-.7084-.2526-1.0534-.0431-.2156-.0862-.4189-.1355-.616-.1232-.5113-.2156-1.0349-.308-1.54v-.1294c-.043-.2307-.0986-.459-.1663-.6837-.101-.3232-.1712-.6553-.2094-.9918-.0177-.3403.005-.6814.0677-1.0164.0368-.2305.0615-.4629.0739-.6961v-4.7432c0-.1971.037-.4065.037-.616.037-.3085.0494-.6196.037-.9301-.0359-.3182-.104-.6319-.2033-.9363l-.0122-.0405c-.0513-.1707-.1019-.3388-.1418-.5386-.0431-.2156-.0924-.4189-.0924-.616-.0298-.3317-.1002-.6586-.2095-.9733-.1423-.3227-.3138-.6326-.5117-.9246-.0984-.16-.1968-.3199-.2891-.4798-.1621-.2751-.3433-.5386-.542-.7885-.1294-.1725-.2588-.3511-.3758-.5298-.1458-.2311-.2715-.4743-.3758-.7269-.103-.2512-.2287-.4924-.3757-.7207-.1421-.2039-.2985-.3974-.4682-.579-.2028-.2155-.3862-.4485-.5482-.6961-.1787-.31-.3331-.6333-.462-.9671-.0555-.1294-.1109-.2649-.1725-.3943-.1252.309-.214.6315-.2649.961-.0246.1478-.0862.2895-.0862.4312-.0855.3391-.1925.6724-.3203.9979-.074.191-.1417.3758-.191.5359-.0838.3357-.1395.6777-.1663 1.0226-.0185.191-.0431.4127-.0801.616s-.0801.4127-.1294.616c-.0818.3342-.1395.6739-.1724 1.0164-.0555.5482-.0555 1.1088-.0555 1.6694.0099.349.0449.697.1047 1.041.037.2279.0924.4682.0924.7022.0185.2687.0185.5383 0 .807-.0309.3175-.0309.6373 0 .9548.0555.3634.1356.7392.2156 1.0965l.1294.616c.0646.2955.1511.5858.2587.8685.1008.2677.1851.5413.2526.8193.0616.2834.1109.6099.154.8624.0431.2526.0862.5791.154.8686.0246.1293.0801.2587.0801.3819.0862.3942.1478.6899.2772 1.115.1293.425.2895.9301.4804 1.466.1073.3325.1795.6752.2156 1.0226l.0555.3573c.0376.1958.087.3891.1478.579.0891.2598.1511.5282.1848.8008.037.3511.037.6961.037 1.0287v.382c.0082.5721-.075 1.1419-.2464 1.6878-.0746.2774-.2183.5313-.4175.7381-.1993.2068-.4477.3598-.7221.4446-.4202.1729-.8854.2032-1.3244.0863-.4518-.0823-.8756-.2772-1.232-.5668-.4031-.3581-.7517-.7731-1.0349-1.232-.2413-.4238-.4473-.8667-.616-1.3243l-.0554-.1479c-.12-.3254-.2167-.6589-.2896-.9979-.0431-.1848-.0862-.3635-.1355-.5482-.1109-.3696-.1971-.7331-.2772-1.0842l-.1109-.462c-.0859-.2965-.1972-.585-.3326-.8624-.1743-.345-.3086-.7087-.4004-1.0842-.1047-.5359-.1848-1.1088-.2587-1.6509-.0669-.5408-.1636-1.0775-.2895-1.6077-.0593-.2698-.0984-.5437-.1171-.8193-.0144-.2067-.0411-.4125-.0801-.616-.0512-.209-.115-.4147-.1909-.616-.0901-.2533-.1621-.5127-.2156-.7762-.0718-.3587-.1087-.7406-.1446-1.112l-.0033-.0337c-.0184-.2095-.0677-.4127-.0677-.616-.0256-.2497-.0359-.5006-.0308-.7515.0137-.3324-.0111-.6652-.0739-.9918-.1443-.5262-.2412-1.0643-.28957-1.6078-.01232-.1663-.04928-.3326-.04928-.4928-.05238-.3816-.07094-.767-.05544-1.1519v-.1293c.02835-.5078.08387-1.0136.16629-1.5154.0595-.2943.1503-.5813.2711-.8562.0984-.2295.1787-.4664.2402-.7084.0616-.2526.1109-.4867.1787-.7516.0677-.2648.1478-.6283.2094-.8808.0616-.2526.1047-.4867.1602-.7577.0554-.2711.1108-.5914.1909-.8871.0801-.2956.2033-.6222.2896-.8624.0862-.2402.1724-.4805.2463-.7268.0665-.2562.1077-.5182.1232-.7824.0178-.3025.0695-.6021.154-.8932.1232-.3757.2772-.7515.4189-1.1149l.1848-.462c.1145-.2732.2505-.5368.4066-.7885.1421-.231.2677-.4719.3757-.7207.1294-.3327.2526-.6345.3635-.9487l.2402-.616c.1162-.3146.215-.6354.2957-.9609.0534-.2218.115-.4435.1848-.6653.1879-.6383.5211-1.2244.9733-1.7125.1596-.1723.3523-.3106.5667-.4065l.154-.0863c-.0867-.0864-.1558-.1889-.2033-.3018-.0123-.037-.0616-.0739-.0616-.1417-.0482-.1123-.0894-.2275-.1232-.345-.0337-.1531-.0941-.2991-.1786-.4312-.3987-.4848-.9431-.8283-1.5523-.9794l-.2156-.0801c-.095-.0374-.1876-.0806-.2772-.1293-.014.0052-.0293.0052-.0432 0-.02.0061-.0415.0061-.0616 0-.0148-.0125-.0257-.0291-.0312-.0477-.0055-.0187-.0053-.0385.0004-.0571-.094-.0452-.1933-.0783-.2956-.0985-.7166-.1044-1.3903-.405-1.9466-.8686-.1678.2822-.2452.6089-.2218.9363-.0256.2097-.0731.4162-.1416.616-.074.1848-.1356.4066-.1972.616-.0617.2555-.1462.505-.2525.7454-.1104.2137-.2659.4007-.4559.5482-.17448.122-.31111.2907-.39421.4867-.01574.0917-.01574.1855 0 .2772.00908.086.00908.1727 0 .2587-.02197.1265-.05707.2504-.10472.3696-.04619.1176-.08125.2393-.10472.3634-.04181.3784-.05827.7591-.04928 1.1396v.7392c-.03696.3696 0 .7454 0 1.115v.9548c.0308.579.0308 1.1334.0308 1.6755.00615.3474-.00619.695-.03696 1.0411-.04312.2525-.03696.5236-.04312.7761-.00616.2526.03696.5113.03696.7577.03392.3585.03392.7195 0 1.078-.06555.6107-.17465 1.2159-.32648 1.811-.14683.4529-.35403.8839-.616 1.2813-.25557.3958-.62493.7051-1.05952.8871l-.67144.2956c-.42504.1787-1.0164.4374-1.232.5483-.00891.0111-.02013.0202-.0329.0266-.01276.0064-.02676.0099-.04102.0103h-.04312c-.01887.004-.03852.002-.0562-.0057-.01767-.0077-.03249-.0208-.04236-.0374-.18973-.3427-.36123-.2963-.65345-.2171l-.00567.0015c-.14667.0389-.29796.0575-.44968.0555-.51625-.0667-1.01438-.2341-1.46608-.4928l-.0924-.0432c-.44139-.2408-.8546-.5301-1.232-.8624-.398365-.3071-.736667-.6851-.997918-1.1149-.181288-.4921-.2301442-1.0231-.14168-1.54v-.3388c.001464-.3996.055311-.7972.160162-1.1827.12817-.3112.291439-.6068.486638-.8809.1232-.1848.271118-.4067.357358-.5792.08621-.1724.17243-.3449.25248-.5173.15117-.3333.32402-.6564.51744-.9671.1498-.2179.25239-.4648.30119-.7247s.04272-.5271-.01783-.7845c-.12485-.5306-.31956-1.0422-.57904-1.5215-.0924-.1787-.20328-.3573-.308-.5298-.18518-.2911-.34787-.5958-.486637-.9117l-.110881-.1971c-.236665-.4338-.3536-.9228-.338799-1.4168.069739-.474.191625-.9388.36344-1.386.143538-.4576.337757-.8976.579037-1.3121.16236-.3363.38349-.6408.65296-.8993.0924-.074.19096-.154.2772-.2341.40816-.4354.92479-.7543 1.49688-.924.19096-.037.37576-.0801.57288-.0801.36856-.0254.73264-.0958 1.08416-.2094.50762-.1782.94122-.5207 1.232-.9733.34287-.4447.59792-.9506.75152-1.4907.06778-.296.06778-.6034 0-.8994v-.1725c-.07391-.4364-.18731-.8653-.3388-1.2813-.0924-.2587-.1848-.5913-.25256-.8747l-.03696-.1478c-.15021-.5186-.22693-1.0556-.22792-1.5955.04142-.5887.14676-1.1711.31416-1.7371.15793-.5708.36401-1.1272.616-1.6632.00817-.0468.00817-.0948 0-.1417.00535-.1427.03885-.2829.09856-.4127.06787-.0963.16194-.1711.27104-.2156.08009-.0328.15169-.0833.20944-.1478.03696-.037.0308-.0986 0-.2279-.0308-.1294-.0616-.2834.0308-.382.06919-.0692.1539-.121.24711-.151.0932-.03.19221-.0373.28881-.0214.11546.0198.23414-.0044.33264-.0678.22288-.1735.4291-.3673.616-.579.2121-.2268.44519-.4331.69609-.616.4909-.3684 1.038-.6555 1.6201-.8501.1631-.0279.3297-.0279.4928 0 .2081.0348.4219.0092.616-.0739.1601-.0863.2464-.1479.3141-.191.1848-.1294.2218-.1355.6653-.0924.2156.0185.4066.0801.616.0801.301.0568.6057.0918.9117.1047h.5544c.328-.0587.6638-.0587.9918 0 .4723.1464.9237.3534 1.3428.616.4133.2553.8066.5416 1.1766.8562.2248.2203.4084.479.5421.7639.0675.1289.1415.2543.2217.3757.0822.1109.1622.228.2403.3512.1663.2279.3326.4681.5113.7453.08.1232.1663.2772.2525.4374.1549.337.3628.6468.616.9178.1295.0718.2724.1159.4198.1297.1473.0138.2959-.0031.4365-.0496.1892-.0361.3836-.0361.5728 0 .345.0616 1.3429.4743 1.54.9979.0291.0649.0441.1353.0441.2064s-.015.1414-.0441.2063c.0267.0156.0497.0366.0678.0616.1047.1602-.0185.4867-.4127 1.1027v.0554c-.0217.0953-.0217.1943 0 .2895.0225.0824.0172.17-.0151.249-.0323.0791-.0898.1453-.1636.1884.0924.1786.1664.3511.2403.5174.0947.2295.2059.4519.3326.6653.0678.1047.1355.2033.2095.3019.2438.2957.4166.6434.5051 1.0164.0906.4042.1094.8212.0554 1.232-.0155.2235-.0155.4479 0 .6714.0056.016.0056.0333 0 .0493.0038.0113.0051.0233.004.0351-.0011.0119-.0047.0234-.0105.0338s-.0137.0195-.0231.0268c-.0095.0072-.0204.0124-.032.0152-.2833.0677-.6468.7453-.8993 1.195-.0826.1564-.1731.3086-.2711.4558l-.1293.1848c-.3198.3858-.5322.849-.616 1.3429-.0124.0924-.0555.1971-.0555.308-.1082.3762-.1581.7668-.1478 1.1581.0305.4725.1323.9377.3018 1.3798.0034.0142.0034.029 0 .0432v.308c.1294.0554.2649.0985.3943.1478l.308.1047c.2214.1043.4285.2369.616.3943.1361.111.2802.2119.4312.3018.308.1725.7084.3634.9609.4743.2526.1109.4189.191.77.3635.3511.1724.7331.4127.9671.5482.2341.1355.4682.2772.7084.4066l.5729.3018c.3758.1848.6961.345 1.115.616s.8131.4928 1.232.7207l.8008.4559c.3388.1971.6345.3572.9548.5297l.1109.0555c.1386.0839.2704.1786.3942.2833.174.1664.3852.2888.616.3573.0739-.1663.2218-.5482.616-1.503l.1171-.2898c.1602-.4003.308-.7698.4496-1.1332.1417-.3634.2464-.6283.2895-.7146.1417-.3018.2649-.616.382-.9178l.2402-.5852c.1478-.3388.2834-.6776.4189-1.0226.0616-.1601.1293-.3203.1971-.4866.1118-.2524.2436-.4955.3942-.7269.1441-.2288.2717-.4676.382-.7145.08-.1972.1478-.4066.2094-.616.0756-.2576.1661-.5106.271-.7577.1007-.2285.1872-.463.2588-.7023.0739-.2217.154-.4496.2464-.6652.0915-.1988.1943-.3921.308-.5791.1398-.2272.2593-.4663.3572-.7145.0185-.0493.0616-.1602.1294-.3142.1294-.3142.345-.8316.5359-1.3552.0678-.1725.1294-.3449.191-.5113.1663-.4681.2772-.77.3634-.9548-.2667.0148-.5341.0148-.8008 0h-.2772c-.5421.0493-1.0595.1109-1.6016.1848l-.462.0616h-.4989c-.3279-.0256-.6575.0185-.9672.1294-.1751.1247-.3437.2584-.5051.4004-.1109.0985-.2094.1848-.2772.2341-.3364.308-.749.5207-1.195.616-.4678.0653-.9442-.0188-1.3614-.2403-.3306-.2197-.5694-.5527-.6714-.9363l-.1109-.2649c-.1602-.3449-.3018-.7084-.4374-1.0595l-.0739-.2033c-.0801-.2033-.1909-.4127-.2895-.616-.1564-.2944-.2823-.604-.3758-.924-.0752-.2815-.1328-.5675-.1724-.8562-.0339-.2635-.0832-.5247-.1479-.7823-.0967-.3001-.2204-.5908-.3696-.8686-.0924-.1786-.1848-.3634-.2649-.5544-.2094-.4866-.3696-.9794-.4866-1.3429l-.0493-.154c-.0999-.3078-.1279-.6344-.082-.9547.0459-.3204.1646-.6259.3469-.8933.1587-.2856.3738-.5361.6321-.7362.2584-.2002.5547-.3458.8709-.428.3069-.032.617.0069.9064.1137.2895.1068.5505.2786.763.5023.3722-.3721.7855-.7007 1.232-.9795.4127-.2772.8378-.5051 1.1211-.6591l.2526-.1417c.2642-.1879.5153-.3938.7515-.616.1786-.1601.3634-.3326.5606-.4804.2797-.2002.5766-.3754.887-.5236.2094-.1048.3696-.1787.616-.3327s.4866-.3141.7207-.4805c.2341-.1663.4805-.3326.7207-.4866l.6776-.4066.807-.4928c.2772-.1786.5482-.3696.8131-.5605l.616-.4251c.2587-.1724.5606-.4004.7515-.5667.191-.1663.4004-.3326.616-.4866l.4805-.3327c.3142-.2156.6283-.4312.9302-.6652l.4497-.3573c.2895-.2279.5913-.4682.9055-.6838.2612-.1688.5328-.321.8131-.4558.2322-.1089.4584-.2303.6776-.3635.1971-.1416.3634-.2587.616-.4373.2526-.1787.5174-.3635.7762-.5175.2587-.154.5051-.3264.7392-.4989l.4435-.308c.1691-.1128.3227-.2049.5128-.3188l.0862-.0517c.206-.1235.4217-.2529.6207-.3934.2125-.1431.4325-.2747.6591-.3942.2217-.1047.425-.2156.616-.3388l.616-.4374.7084-.4866c.2649-.1725.5236-.3511.7761-.5298l.5791-.3942.1971-.1355c.3819-.2526.7762-.5175 1.1519-.7885l.4682-.3388c.3265-.2341.6591-.4805 1.0102-.7022.2464-.1664.4928-.3388.7331-.5175l.04-.0298c.23-.1711.4838-.3599.6992-.4938.2279-.1417.462-.271.696-.3942.2976-.1504.5857-.3191.8624-.5051.2033-.154.4128-.3327.616-.49283.2033-.16016.4251-.3388.616-.47432.191-.13552.3388-.26488.5544-.44352s.4435-.36344.6838-.52976c.2491-.15895.5132-.29306.7885-.4004.2109-.08646.4166-.18519.616-.29569.234-.14168.4558-.26487.7269-.41271.271-.14784.5544-.308.8316-.47432.4188-.2464.8316-.5236 1.232-.78848l.271-.17864c.281-.20126.5412-.43048.7763-.6839.1786-.17859.3572-.35718.5481-.5173.4189-.35728 1.0349-.82544 1.6509-1.26896.3644-.24714.7548-.4537 1.1642-.616.2464-.11088.4743-.2156.6899-.33264.1983-.12132.3859-.2594.5606-.41272l.0224-.01832c.4993-.40818 1.0524-.86036 1.6593-.302.2398.37096.3896.79285.4373 1.232.0361.1895.0834.37668.1417.56056.1109.33264.2279.63448.345.94863.154.41272.3203.84393.462 1.26897.0862.25872.2033.56056.2957.75152s.1786.38808.2587.616c.0745.21218.1331.43503.1905.65365l.0128.04859c.0575.24565.1274.48825.2094.72688.0944.22479.2078.44116.3388.6468.1384.21514.2579.44185.3573.67759.0699.24472.1092.49712.117.75152.0142.2272.0409.4534.0801.6776.0445.4399.1946.8625.4373 1.232.2875.1783.6046.3035.9364.3696.236.0564.4667.1327.6899.2279.6227.2898 1.208.6538 1.7433 1.0842.1109.1047.2279.2033.3449.2957.3325.2459.6236.5433.8624.8808.2935.4845.5194 1.0068.6715 1.5524.155.5438.2439 1.1043.2648 1.6693.0183.5634-.023 1.127-.1231 1.6817-.0856.3499-.2204.6859-.4004.9979-.0982.1757-.1866.3567-.2649.5421-.1774.4241-.3832.8357-.616 1.232l-.0801.1417c-.2834.4989-.2772.5113-.1109.8316.0864.155.1625.3155.2279.4805.0616.1478.1417.3018.2095.4496.1245.229.2296.468.3141.7146.0493.1602.0924.3265.1356.4928.0519.2391.1219.4738.2094.7022.0862.2218.1971.4559.308.6838l.1971.4066c.1294.2956.2403.5728.3635.8747v.0554c.1052.2857.1836.5806.234.8809.0461.2708.1099.5383.191.8008z" /></G></SVG>

				<p>{ __( 'Your site is live on', 'nextgen' ) }</p>

				<p>
					<Button
						href={ props.homeurl }
						className="publish-guide-success__website"
						isLink
					>
						{ props.homeurl }
					</Button>
				</p>

				<p>{ __( 'Time to celebrate and', 'nextgen' ) }<br />{ __( 'share the great news.', 'nextgen' ) }</p>

				<Confetti className="publish-guide-success__confetti" active={ props.confettis } config={ confettisConfig } />

				<ul className="publish-guide-success__social">
					<li className="publish-guide-success__social__item">
						<Button
							className="publish-guide-success__social__button"
							href={ sprintf(
								'https://www.facebook.com/sharer/sharer.php?u=%1$s&quote=%2$s',
								props.homeurl,
								__( 'Check out my new website!', 'nextgen' )
							) }
						>
							<Icon icon={ FacebookIcon } />
						</Button>
					</li>
					<li className="publish-guide-success__social__item">
						<Button
							className="publish-guide-success__social__button"
							href={ sprintf(
								'https://twitter.com/intent/tweet?text=%1$s&url=%2$s',
								encodeURI( __( 'Check out my new website!', 'nextgen' ) ),
								props.homeurl
							) }
						>
							<Icon icon={ TwitterIcon } />
						</Button>
					</li>
					<li className="publish-guide-success__social__item">
						<Button
							className="publish-guide-success__social__button"
							href={ sprintf(
								'mailto:someone@yoursite.com?&subject=%1$s&body=%2$s',
								encodeURI( __( 'Check out my new website!', 'nextgen' ) ),
								sprintf(
									// translators: %1$s is a placeholder for the site's url.
									__( 'I just published my website at %1$s, come check it out and let me know what you think!', 'nextgen' ),
									props.homeurl
								)
							) }
						>
							<Icon icon={ FormIcon } />
						</Button>
					</li>
				</ul>
			</div>

			<footer className="publish-guide-success__footer">
				<Button
					isLink
					className="publish-guide-success__footer__button"
					onClick={ () => props.onTriggerGiveFeedback() }
				>
					{ __( 'Give feedback', 'nextgen' ) }
					<Icon icon={ verse } />
				</Button>

				<Button
					isLink
					className="publish-guide-success__footer__button"
					onClick={ () => props.onTriggerClosePopover() }
				>
					{ __( 'Hide this guide', 'nextgen' ) }
					<Icon icon={ <SVG fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><Path clipRule="evenodd" d="m18.6548 6.46091-2.0811 2.08903-.5618.55391-7.32742 7.32745-.56973.5697-1.65381 1.6538-1.11573-1.1157 1.5272-1.5272c-1.08408-1.0129-2.03363-2.2869-2.70624-3.6637l-.16617-.3482.16617-.3482c1.40851-2.8803 4.45501-5.98218 7.83383-5.98218 1.274 0 2.6192.46686 3.8853 1.32938l1.6538-1.65382zm-7.826 4.33629c-.451.4511-.5855 1.0999-.4194 1.6776l2.0812-2.0811c-.5698-.1662-1.2266-.0396-1.6618.4035zm2.8487-1.59839c-.4986-.30861-1.0762-.4827-1.6776-.4827-.8704 0-1.6855.34026-2.30267.96539-1.06825 1.0762-1.2186 2.73-.48269 3.9881l-1.2186 1.2186c-.87043-.7992-1.6459-1.7962-2.22355-2.8882 1.28982-2.41346 3.76658-4.74779 6.22751-4.74779.8783 0 1.82.31652 2.7379.88626zm4.5896.00791c.6172.75965 1.1474 1.58258 1.5668 2.44508l.1662.3482-.1662.3482c-1.4085 2.8803-4.455 5.9822-7.8338 5.9822-.6964 0-1.4006-.1345-2.11281-.3957l-.34026-.1266 1.26607-1.2581c.4036.1187.8071.1978 1.1949.1978 2.4609 0 4.9456-2.3343 6.2354-4.7478-.3244-.6093-.7122-1.1869-1.1474-1.7329l1.1237-1.12368z" fill="currentColor" fillRule="evenodd" /></SVG> } />
				</Button>
			</footer>
		</div>
	);
};

export default SuccessView;

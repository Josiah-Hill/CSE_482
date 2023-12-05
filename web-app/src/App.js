import './App.css';

// Images
import heatmap from './assets/correlationHeatmap.png';
import outliers from './assets/outliers.png';
import dist from './assets/distribution.png';
import puntReturn from './assets/puntReturn.png';
import hurries from './assets/hurries.png';
import confPoints from './assets/avgPoints.png';
import schoolPoints from './assets/schoolPoints.png';
import conversions from './assets/conversions.png';
import fitted from './assets/fitted.png';
import bell from './assets/bell.png';
import prob from './assets/prob.png';


function App() 
{
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <h1>CSE 482: Quantifying Luck in College Football</h1>
                <p>By: John Foss, Josiah Hill, Michael Guel, Peter Imoukhuede, Zachary Gage</p>
            </header>
            <div>
            </div>

            {/* Objective */}
            <div className="section">
                <h1>Objective</h1>
                <p>The primary objective of our project is to predict scoring for college football teams based on other team statistics. Teams that outscore our predictions might be seen as "lucky" while teams that underperform might be considered "unlucky". Identifying games with high "luck" would provide us a subset of data for a future project that could analyze what "luck" really represents.</p>
                <p>The site CollegeFootballData.com provides a large amount of historic data on college football games. For our purposes, we have extracted data on every game played by a power-5 team over the last seven years, excluding 2020. Power-5 teams are teams from the ACC, SEC, Big 10, Big 12, and PAC 12, which are considered the premier conferences in college football. We only include these teams because they generally operate with a similar level of financial resources and have a more equal level of player performance in comparison to other conferences. We also exclude the year 2020 because we don't believe that the data from that year will follow the same trends as other years due to COVID-related complications.</p>
                <p>Our training data will consist of the data from 2017-19, 2021, and 2022. Given this data, we will identify and remove statistics that correlate too strongly with scoring (like touchdowns). We will use EDA to understand the distribution of our various features and potentially identify other features to exclude. Then we will compare various modeling techniques, such as linear regression, random forest, and xgboost, to identify the highest performing technique. Then we can perform a grid search to optimize the hyperparameters and finalize our model. We can then apply our model to our test data (2023) and visualize the results to see how luck is distributed across teams.</p>
            </div>

            {/* Data Dictionary */}
            <div className="section">
                <h3>Data Dictionary:</h3>
                <ul>
                    <li>Game Id: Identifier for each game.</li>
                    <li>School: Name of the school.</li>
                    <li>Conference: Conference of the school.</li>
                    <li>HomeAway: Whether the team was home or away.</li>
                    <li>Points: Points scored in the game.</li>
                    <li>firstDowns: Number of first downs.</li>
                    <li>fumblesLost: Number of fumbles lost.</li>
                    <li>fumblesRecovered: Number of fumbles recovered.</li>
                    <li>interceptionYards: Yards gained from interceptions.</li>
                    <li>interceptions: Number of interceptions.</li>
                    <li>kickReturnYards: Yards gained from kick returns.</li>
                    <li>netPassingYards: Net yards gained by passing.</li>
                    <li>passesDeflected: Number of passes deflected.</li>
                    <li>passesIntercepted: Number of passes intercepted.</li>
                    <li>possessionTime: Time of possession in seconds.</li>
                    <li>puntReturnYards: Yards gained from punt returns.</li>
                    <li>puntReturns: Number of punt returns.</li>
                    <li>qbHurries: Number of quarterback hurries.</li>
                    <li>rushingAttempts: Number of rushing attempts.</li>
                    <li>rushingYards: Yards gained by rushing.</li>
                    <li>sacks: Number of sacks.</li>
                    <li>tackles: Number of tackles.</li>
                    <li>tacklesForLoss: Tackles for a loss.</li>
                    <li>totalFumbles: Total number of fumbles.</li>
                    <li>totalYards: Total yards gained.</li>
                    <li>turnovers: Total turnovers.</li>
                    <li>yardsPerPass: Average yards gained per pass.</li>
                    <li>yardsPerRushAttempt: Average yards gained per rush attempt.</li>
                    <li>completions: Number of completed passes.</li>
                    <li>attempts: Number of pass attempts.</li>
                    <li>thirdDownsConverted: Third downs converted.</li>
                    <li>thirdDownAttempts: Third down attempts.</li>
                    <li>fourthDownsConverted: Fourth downs converted.</li>
                    <li>fourthDownAttempts: Fourth down attempts.</li>
                    <li>totalPenalties: Total number of penalties.</li>
                    <li>penaltiesYards: Yards lost due to penalties.</li>
                </ul>
                <p>Data comes from <a href="CollegeFootballData.com">CollegeFootballData.com</a></p>
            </div>

            {/* Operations */}
            <div className="section">
                <h1>Operations</h1>
                <ol>
                    <li>Load the csv data into a pandas dataframe.</li>
                    <li>Trim data to only reflect Power-5 teams.</li>
                    <li>Drop data we are not interested in. (We mainly care about points)</li>
                    <li>Standardize all data to expected types / values.</li>
                    <ul>This gives us 4213 rows (games) and 37 columns (attributes).</ul>
                    <li>Solving missing values</li>
                    <ul>
                        <li>ThirdDownAttempts, FourthDownAttempts, PossessionTime, Attempts: Missing values in these variables were due to data formating error. The missing values can be imputed using K-nearest neighbor.</li>
                        <li>InterceptionYards and PassesIntercepted: The missing values likely indicate games where interceptions did not occur. It's reasonable to impute these missing values with 0.</li>
                        <li>PuntReturnYards and PuntReturns, KickReturnYards and KickReturns: These also indicate that there were no punt or kick returns in a game. Imputing these with 0 would be a logical choice.</li>
                        <li>TotalFumbles: If a team didn't fumble the ball, this could be the reason for missing values. Imputing 0 for games with no fumbles would be reasonable.</li>
                        <li>TotalPenalties, PenaltiesYards: The absence of penalties could lead to missing values. Imputing 0 in such cases is logical</li>
                        <li>TacklesForLoss, Tackles, QbHurries, PassesDeflected, Sacks: Missing values could indicate no occurrences of these events. Imputing 0 for these values would generally be appropriate.</li>
                    </ul>
                </ol>
            </div>

            {/* Analysis */}
            <div className="section">
                <h1>Data Analysis</h1>
                <ol>
                    <li>Exploatory data Analysis</li>
                    <img src={heatmap} alt="correlation heatmap" className="section"/>
                    <ul>
                        <li>totalYards must be dropped because it has a very strong correlation (&gt;= 0.8) with Points and firstDowns as this will cause data leakage.</li>
                        <li>rushingYardsshould be dropped because it very strong correlation (&gt;= 0.8) with yardsPerRushAttempt</li>
                        <li>attempts should be dropped because it has a very strong correlation (&gt;= 0.8)with completions.</li>
                        <li>kickReturnYards may be dropped because it has a very strong correlation (&gt;= 0.8) with kickReturns.</li>
                    </ul>
                    <li>Outliers</li>
                    <img src={outliers} alt="outliers" className="section"/>

                    <li>Univariate Distribution Visualization</li>
                    <img src={dist} alt="dist" className="section"/>

                    <li>Punt Returns</li>
                    <img src={puntReturn} alt="punt return" className="section"/>

                    <li>Quarterback Hurries</li>
                    <img src={hurries} alt="hurries" className="section"/>

                    <li>Conference Average Points Scored</li>
                    <img src={confPoints} alt="dist" className="section"/>

                    <li>School Average Points Scored</li>
                    <img src={schoolPoints} alt="dist" className="section"/>

                    <li>Fourth Down Conversions</li>
                    <img src={conversions} alt="dist" className="section"/>
                </ol>
            </div>

            {/* Modeling */}
            <div className="section">
                <h1>Modeling</h1>
                <p>Modeling is done using 80/20 test-train split, random state for reproducibility, and two dataframes (full set and reduced).</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Model</td>
                            <td>Adjusted R-Squared</td>
                            <td>R-Squared</td>
                            <td>RMSE</td>
                            <td>Time Taken</td>
                        </tr>
                        <tr>
                            <td>BayesianRidge</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>RidgeCV</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.02</td>
                        </tr>
                        <tr>
                            <td>LassoLarsCV</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.03</td>
                        </tr>
                        <tr>
                            <td>LassoCV</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.12</td>
                        </tr>
                        <tr>
                            <td>ElasticNetCV</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.10</td>
                        </tr>
                        <tr>
                            <td>Ridge</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>LassoLarsIC</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>Lars</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.87</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>LarsCV</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.88</td>
                            <td>0.03</td>
                        </tr>
                        <tr>
                            <td>TransformedTargetRegressor</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.89</td>
                            <td>0.02</td>
                        </tr>
                        <tr>
                            <td>LinearRegression</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.89</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>SGDRegressor</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.89</td>
                            <td>0.02</td>
                        </tr>
                        <tr>
                            <td>HuberRegressor</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.90</td>
                            <td>0.04</td>
                        </tr>
                        <tr>
                            <td>LinearSVR</td>
                            <td>0.78</td>
                            <td>0.79</td>
                            <td>6.92</td>
                            <td>0.02</td>
                        </tr>
                        <tr>
                            <td>MLPRegressor</td>
                            <td>0.78</td>
                            <td>0.78</td>
                            <td>6.99</td>
                            <td>2.10</td>
                        </tr>
                        <tr>
                            <td>GradientBoostingRegressor</td>
                            <td>0.77</td>
                            <td>0.77</td>
                            <td>7.09</td>
                            <td>0.92</td>
                        </tr>
                        <tr>
                            <td>LGBMRegressor</td>
                            <td>0.77</td>
                            <td>0.77</td>
                            <td>7.13</td>
                            <td>0.10</td>
                        </tr>
                        <tr>
                            <td>HistGradientBoostingRegressor</td>
                            <td>0.77</td>
                            <td>0.77</td>
                            <td>7.14</td>
                            <td>0.72</td>
                        </tr>
                        <tr>
                            <td>PoissonRegressor</td>
                            <td>0.76</td>
                            <td>0.76</td>
                            <td>7.25</td>
                            <td>0.02</td>
                        </tr>
                        <tr>
                            <td>ExtraTreesRegressor</td>
                            <td>0.75</td>
                            <td>0.75</td>
                            <td>7.43</td>
                            <td>4.11</td>
                        </tr>
                        <tr>
                            <td>XGBRegressor</td>
                            <td>0.74</td>
                            <td>0.74</td>
                            <td>7.56</td>
                            <td>0.09</td>
                        </tr>
                        <tr>
                            <td>RandomForestRegressor</td>
                            <td>0.74</td>
                            <td>0.74</td>
                            <td>7.58</td>
                            <td>7.06</td>
                        </tr>
                        <tr>
                            <td>Lasso</td>
                            <td>0.73</td>
                            <td>0.73</td>
                            <td>7.72</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>LassoLars</td>
                            <td>0.73</td>
                            <td>0.73</td>
                            <td>7.72</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>ElasticNet</td>
                            <td>0.72</td>
                            <td>0.73</td>
                            <td>7.80</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>OrthogonalMatchingPursuitCV</td>
                            <td>0.71</td>
                            <td>0.72</td>
                            <td>7.91</td>
                            <td>0.02</td>
                        </tr>
                        <tr>
                            <td>BaggingRegressor</td>
                            <td>0.71</td>
                            <td>0.72</td>
                            <td>7.93</td>
                            <td>0.74</td>
                        </tr>
                        <tr>
                            <td>SVR</td>
                            <td>0.71</td>
                            <td>0.71</td>
                            <td>7.99</td>
                            <td>0.63</td>
                        </tr>
                        <tr>
                            <td>NuSVR</td>
                            <td>0.70</td>
                            <td>0.71</td>
                            <td>8.02</td>
                            <td>0.45</td>
                        </tr>
                        <tr>
                            <td>TweedieRegressor</td>
                            <td>0.70</td>
                            <td>0.71</td>
                            <td>8.04</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>AdaBoostRegressor</td>
                            <td>0.69</td>
                            <td>0.70</td>
                            <td>8.16</td>
                            <td>0.40</td>
                        </tr>
                        <tr>
                            <td>OrthogonalMatchingPursuit</td>
                            <td>0.66</td>
                            <td>0.67</td>
                            <td>8.59</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>KNeighborsRegressor</td>
                            <td>0.62</td>
                            <td>0.63</td>
                            <td>9.12</td>
                            <td>0.10</td>
                        </tr>
                        <tr>
                            <td>RANSACRegressor</td>
                            <td>0.62</td>
                            <td>0.63</td>
                            <td>9.14</td>
                            <td>0.10</td>
                        </tr>
                        <tr>
                            <td>PassiveAggressiveRegressor</td>
                            <td>0.59</td>
                            <td>0.60</td>
                            <td>9.45</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>DecisionTreeRegressor</td>
                            <td>0.45</td>
                            <td>0.47</td>
                            <td>10.90</td>
                            <td>0.10</td>
                        </tr>
                        <tr>
                            <td>ExtraTreeRegressor</td>
                            <td>0.35</td>
                            <td>0.36</td>
                            <td>11.94</td>
                            <td>0.05</td>
                        </tr>
                        <tr>
                            <td>DummyRegressor</td>
                            <td>-0.03</td>
                            <td>-0.00</td>
                            <td>14.95</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>KernelRidge</td>
                            <td>-3.35</td>
                            <td>-3.24</td>
                            <td>30.78</td>
                            <td>0.33</td>
                        </tr>
                        <tr>
                            <td>GaussianProcessRegressor</td>
                            <td>-4.16</td>
                            <td>-4.03</td>
                            <td>33.52</td>
                            <td>0.87</td>
                        </tr>
                    </tbody>
                </table>
                <p>With the preliminary model analysis done, it was decided to do a more in-depth analysis with a Ordinary Least Squares.</p>
            </div>

            {/* Linear Regression Model */}
            <div className="section">
                <h1>Ordinary Least Squares Model</h1>
                <h3>Checking Assumptions</h3>
                <ol>
                    <li>Removing Multicollinearity</li>
                    <ol>
                        <li>Drop every column one by one that has VIF score greater than 10.</li>
                        <li>Look at the adjusted R square of all these models</li>
                        <li>Drop the Variable that makes least change in Adjusted-R square</li>
                        <li>Check the VIF Scores again</li>
                        <li>Continue till you get all VIF scores under 10</li>
                    </ol>
                    <li>Mean of residuals should be 0</li>
                    <ul>
                        <li>Mean of residuals: 1.869481548580067e-14</li>
                        <li>Close enough to 0 where floating point rounding becomes the issue</li>
                    </ul>
                    <li>No Heteroscedasticity</li>
                    <ul>
                        <li>We'll use Goldfeldquandt Test to test the following hypothesis</li>
                        <li>Null hypothesis : Residuals are homoscedastic</li>
                        <li>Alternate hypothesis : Residuals have hetroscedasticity</li>
                        <li>alpha = 0.05 </li>
                        <li>p-value: 0.9990488967969766</li>
                        <li>Since p-value &gt; 0.05 we cannot reject the Null Hypothesis that the residuals are homoscedastic. </li>
                        <li>Assumptions 3 is also satisfied by our olsmodel3.</li>
                    </ul>
                    <li>Linearity of variables</li>
                    <img src={fitted} alt="fitted" className="section"/>
                    <ul>
                        <li>Assumptions 4 is satisfied by our olsmodel3. There is no pattern in the residual vs fitted values plot.</li>
                    </ul>
                    <li>Normality of error terms</li>
                    <img src={bell} alt="bell curve" className="section"/>
                    <img src={prob} alt="probability" className="section"/>
                    <ul>
                        <li>The residuals have a close to normal distribution. Assumption 5 is also satisfied.</li>
                    </ul>
                </ol>
                

            </div>

            {/* Model Interpretation */}
            <div className="section">
                <h1>Ordinary Least Squares Model Interpretation</h1>
                <p>Our regression analysis indicates a strong model with an R-squared value of 79.2%, suggesting that approximately 80% of the variance in the Total Game Points can be explained by the predictors included in the model. Significant predictors with a p-value less than 0.05, indicating a strong statistical significance, include:</p>
                <ul>
                    <li><b>First Downs</b>: Positive correlation; each additional First Down is associated with an increase of 4.67 points.</li>
                    <li><b>Average Yards Per Pass</b>: Positive correlation; for each yard increase in passing, the Total Game Points increase by about 4.47 points.</li>
                    <li><b>Fourth Downs Converted</b>: Positive correlation; each successful conversion is associated with an increase of 2.31 points.</li>
                    <li><b>Fourth Down Attempts</b>: Negative correlation; each additional attempt is associated with a decrease of 2.09 points.</li>
                    <li><b>Total Turnovers</b>: Negative correlation; each turnover is associated with a decrease of 1.93 points.</li>
                </ul>
                <p>The model also identified other significant variables such as Yards Gained from Punt Returns and Interceptions, as well as Fumbles Recovered. It is crucial to note that these relationships are correlational and do not imply causation. For example, while Fourth Down Attempts are negatively correlated with Total Game Points, this does not necessarily mean that attempting more fourth downs causes a lower score. It could be reflective of game strategy in specific scenarios.</p>
            </div>

            {/* Conculsion */}
            <div className="section">
                <h1>Conclusion and Future Work</h1>
                <p>There is a some amount of "luck" involved in college football games. If there was no luck, our models should have close to perfect predictions, but they don't. Our model suggest that ~80% of a game's score can be attributed attributes we looked at. The other 20% can be to features we didn't consider or luck.</p>
                <p>Applying our finding field, coaches may see that the more first downs a team has increases probability to score higher. Thus they may conclude it is better to have shorter plays focused getting just 10 more yards rather than risk a big play. Or look at our second most positive correlated attribute of average yards per pass. This could lead to a teams making riskier longer passes in an attempt to maximise score.</p>
                <p>Going beyond Power-5 football, could this data be applied to NFL games. Will the NFL have different attributes that are better predictors of success.</p>
            </div>
        </div>
    );
}
  
export default App;
  
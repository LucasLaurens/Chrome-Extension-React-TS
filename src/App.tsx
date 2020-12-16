import React from 'react';
import { getCovidDatas } from './services/api';
import './App.css';

interface IState {
  city: any;
  date: String;
};

interface IProps {}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      city: null,
      date: "2020-04-19"
    }

    this.search = this.search.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  public componentDidMount() {
    this.search();

    if (chrome && chrome.tabs) {
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, {from: "popup", subject: "getFullName"}, response => {
          console.log(response)
        });
      });
    }
  }

  handleChange(e: any) {
    this.setState({
      date: e.target.value
    });
  }

  async search() {
    const res: any = await getCovidDatas.oneCity(this.state.date);
    let result: any;

    if (undefined != res.allFranceDataByDate) {
      result = res.allFranceDataByDate.find((item: any) => {
        return item.nom === "Paris";
      });

      this.setState({
        city: result
      });
    }
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="city-infos">
            <input className="city-search-bar" type="date" onChange={this.handleChange} />
            <button className="city-search" onClick={this.search}>Search</button>
            {(this.state.city && null != this.state.city) ?
              <div className="city-container">
                  <h1 className="city-name">
                    {this.state.city.nom}
                  </h1>
                  <table>
                    <thead>
                      <tr>
                        <th>deces</th>
                        <th>gueris</th>
                        <th>hospitalises</th>
                        <th>reanimation</th>
                        <th>date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.city.deces}</td>
                        <td>{this.state.city.gueris}</td>
                        <td>{this.state.city.hospitalises}</td>
                        <td>{this.state.city.reanimation}</td>
                        <td>{this.state.city.date}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            : <div className="error">Pas de données pour cette date..</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
#!/usr/bin/env python


import pymysql
import logging
import traceback
import json
from os import environ

endpoint = 'database-test1.ceaqqtrkg3y1.us-west-2.rds.amazonaws.com'
port = '3306'
dbuser = 'josh'
password = 'Batman446305!'
database = 'amzn'

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def make_connection():
    return pymysql.connect(host='database-test1.ceaqqtrkg3y1.us-west-2.rds.amazonaws.com', user='josh',
                           passwd='Batman446305!',
                           port=int('3306'), db='amzn', autocommit=True)


def log_err(errmsg):
    logger.error(errmsg)
    return {"body": errmsg, "headers": {}, "statusCode": 400,
            "isBase64Encoded": "false"}


logger.info("Cold start complete.")


def handler(event, context):
    def ddb_firstLast():
        return "SELECT amzn.individual_results.finishtime, amzn.individual_results.first_name, amzn.individual_results.last_name, amzn.individual_results.rid, amzn.Events.raceName, amzn.Events.raceDate FROM amzn.individual_results INNER JOIN amzn.Events ON amzn.individual_results.raceid=amzn.Events.raceid  WHERE first_name LIKE '%{}%' AND last_name LIKE '%{}%'".format(
            event['queryStringParameters']['first_name'], event['queryStringParameters']['last_name'])

    def ddb_rid():
        return "Select * FROM amzn.individual_results WHERE raceid = {} AND rid = {}".format(
            event['queryStringParameters']['raceid'], event['queryStringParameters']['rid'])

    def ddb_event():
        return "Select * FROM amzn.Events WHERE raceName like '%{}%'".format(event['queryStringParameters']['raceName'])

    def ddb_first():
        return "SELECT amzn.individual_results.finishtime, amzn.individual_results.first_name, amzn.individual_results.last_name, amzn.individual_results.rid, amzn.Events.raceName, amzn.Events.raceDate FROM amzn.individual_results INNER JOIN amzn.Events ON amzn.individual_results.raceid=amzn.Events.raceid  WHERE first_name LIKE '%{}%' OR last_name LIKE '%{}%'".format(
            event['queryStringParameters']['first_name'], event['queryStringParameters']['first_name'])

    def ddb_recentEvents():
        return "SELECT * FROM amzn.Events WHERE raceDate <= CURDATE()"

    def ddb_futureEvents():
        return "SELECT * FROM amzn.Events WHERE raceDate >= CURDATE()"

    operation = event['queryStringParameters']['query']

    operations = {
        "firstLastSearch": ddb_firstLast,
        "ridSearch": ddb_rid,
        "eventSearch": ddb_event,
        "firstSearch": ddb_first,
        "recentEvents": ddb_recentEvents,
        "futureEvents": ddb_futureEvents,
    }

    query = operations[operation]()

    try:
        cnx = make_connection()
        cursor = cnx.cursor()

        try:
            cursor.execute(query)
        except:
            return log_err("ERROR: Cannot execute cursor.\n{}".format(
                traceback.format_exc()))

        try:
            results_list = []
            for result in cursor:
                finalresult = []
                for rows in result:
                    finalresult.append(str(rows))
                results_list.append(((finalresult)))
            # print(results_list)
            endresults = {
                "result": results_list
            }
            cursor.close()

        except:
            return log_err("ERROR: Cannot retrieve query data.\n{}".format(
                traceback.format_exc()))

        return {"body": json.dumps(endresults), "headers": {
            "Access-Control-Allow-Headers": '*',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }, "statusCode": 200,
                "isBase64Encoded": "false"}


    except:
        return log_err("ERROR: Cannot connect to database from handler.\n{}".format(
            traceback.format_exc()))


    finally:
        try:
            cnx.close()
        except:
            pass


if __name__ == "__main__":
    handler(None, None)


mod pb;
use pb::mydata::v1 as mydata;

use substreams::Hex;
use substreams_ethereum::pb::eth::v2::Block;

#[allow(unused_imports)]
use num_traits::cast::ToPrimitive;

substreams_ethereum::init!();

#[substreams::handlers::map]
fn map_my_data(blk: Block) -> mydata::MyData {
    let mut my_data = mydata::MyData::default();
    my_data.block_hash = Hex(&blk.hash).to_string();
    my_data.block_number = blk.number.to_u64().unwrap();
    my_data.block_timestamp = Some(blk.timestamp().to_owned());
    my_data.transactions_len = blk.transaction_traces.len() as u64;
    my_data
}
